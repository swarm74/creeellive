import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'status.json');

// 1. GET Request (The Website uses this to show status)
export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    // If file doesn't exist, return defaults
    return NextResponse.json({
      valorant: "Undetected",
      fortnite: "Undetected",
      rust: "Undetected",
      spoofer: "Undetected"
    });
  }
}

// 2. POST Request (The Discord Bot uses this to update status)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, game, status } = body;

    // SECURITY: Change "my-secret-password" to something only you know!
    if (key !== "creel") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Read current data
    let currentData = { valorant: "Undetected", fortnite: "Undetected", rust: "Undetected", spoofer: "Undetected" };
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      currentData = JSON.parse(fileContents);
    }

    // Update the specific game
    // valid games: "valorant", "fortnite", "rust", "spoofer"
    if (game && status) {
      currentData[game as keyof typeof currentData] = status;
    }

    // Save back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));

    return NextResponse.json({ success: true, newStatus: currentData });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}