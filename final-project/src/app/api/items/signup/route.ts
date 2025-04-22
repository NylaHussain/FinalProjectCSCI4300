import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  await connectMongoDB();
  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}