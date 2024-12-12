import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { User, Song } from "../../../../types/user";

const USERS_FILE_PATH = path.join(process.cwd(), "storage/database/users.json");

// Helper: Read users from the file
async function readUsersFromFile(): Promise<User[]> {
  const fileData = await readFile(USERS_FILE_PATH, "utf-8");
  return JSON.parse(fileData) as User[];
}

// Helper: Write users to the file
async function writeUsersToFile(users: User[]): Promise<void> {
  await writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
}

// GET: Retrieve all songs for a specific user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId") || "0", 10);

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  const users = await readUsersFromFile();
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.favoriteSongs, { status: 200 });
}

// POST: Add a new song for a user
export async function POST(req: Request) {
  const { userId, song }: { userId: number; song: Song } = await req.json();

  if (!userId || !song) {
    return NextResponse.json({ message: "User ID and song details are required" }, { status: 400 });
  }

  const users = await readUsersFromFile();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  users[userIndex].favoriteSongs.push(song);

  await writeUsersToFile(users);
  return NextResponse.json(song, { status: 201 });
}

// PUT: Update an existing song for a user
export async function PUT(req: Request) {
  const { userId, song }: { userId: number; song: Song } = await req.json();

  if (!userId || !song || !song.id) {
    return NextResponse.json({ message: "User ID and song details (with ID) are required" }, { status: 400 });
  }

  const users = await readUsersFromFile();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const songIndex = users[userIndex].favoriteSongs.findIndex((s) => s.id === song.id);

  if (songIndex === -1) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  users[userIndex].favoriteSongs[songIndex] = song;

  await writeUsersToFile(users);
  return NextResponse.json(song, { status: 200 });
}

// DELETE: Remove a song for a user
export async function DELETE(req: Request) {
  const { userId, songId }: { userId: number; songId: number } = await req.json();

  if (!userId || !songId) {
    return NextResponse.json({ message: "User ID and song ID are required" }, { status: 400 });
  }

  const users = await readUsersFromFile();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  users[userIndex].favoriteSongs = users[userIndex].favoriteSongs.filter((s) => s.id !== songId);

  await writeUsersToFile(users);
  return NextResponse.json({ message: "Song deleted successfully" }, { status: 200 });
}
