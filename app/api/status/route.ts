import { NextResponse } from 'next/server';

// Vercel cannot save files (fs.writeFileSync will crash).
// We use a variable instead. Note: This resets if the server restarts.
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

    // CHECK YOUR KEY HERE
    if (key !== "creel") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (game && status) {
        // Update the memory variable
        memoryStatus = {
            ...memoryStatus,
            [game]: status
        };
    }

    return NextResponse.json({ success: true, newStatus: memoryStatus });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}