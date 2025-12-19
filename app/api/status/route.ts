import { NextResponse } from 'next/server';

// VERCEL SAFE VERSION (No File Saving)
// We use a variable to store status in memory.
// Note: This resets if the website "goes to sleep" (no visitors for a while).
let memoryStatus = {
  valorant: "Undetected",
  fortnite: "Undetected",
  rust: "Undetected",
  spoofer: "Undetected"
};

export async function GET() {
  return NextResponse.json(memoryStatus);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, game, status } = body;

    // 1. CHECK PASSWORD
    if (key !== "creel") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. UPDATE MEMORY (Do not use fs.writeFileSync)
    if (game && status) {
        memoryStatus = {
            ...memoryStatus,
            [game]: status
        };
    }

    return NextResponse.json({ success: true, newStatus: memoryStatus });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}