/* 
//new
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

//const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"; // in production, keep this in .env

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string, 
      { expiresIn: "1h" }
    );

    // Respond with success message and token
    return NextResponse.json({
      message: "User has been created",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    }, { status: 201 });
  } catch (e: any) {
    console.error("Signup error:", e.message);
    return NextResponse.json({ message: "Server error: " + e.message }, { status: 500 });
  }
}


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../../../config/mongodb";
import User from "../../../models/userSchema"; // adjust path if needed

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectMongoDB(); // connect with Mongoose

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Signup successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
    });

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//WORKING
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
  }

  await connectMongoDB();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User has been created" }, { status: 201 });
}
*/


//tutorial

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
