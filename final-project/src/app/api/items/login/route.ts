/*
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ 
        message: "Login successful",
        token, 
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

//testing
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Compare hashed password in the database with the input password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    console.log("Generated Token: ", token);
    const response = NextResponse.json({ message: "Login successful" });

    // Set token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

*/


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    //Compare hashed password in  database with the input password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    //Generate JWT token
    const token = jwt.sign(
      { username: user.username, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Login successful" });

    // Set token in cookies
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      //1 hour time
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
