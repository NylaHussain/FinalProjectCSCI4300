import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectMongoDB();
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }
  
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }