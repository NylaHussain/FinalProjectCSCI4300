/*
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb"; // adjusted for cleaner path

export async function POST(request: Request) {
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

  // Generate JWT token (optional depending on your auth flow)
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return NextResponse.json({ message: "Login successful", token });
}
  

import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../config/mongodb"; // adjust path if needed
import User from "@/app/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const { email, password } = body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json("Invalid email or password", { status: 401 });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json("Invalid email or password", { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set token as an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Example function to authenticate user (you will implement it based on your database)
  const user = await authenticateUser(email, password); // Replace with actual logic to authenticate the user

  if (!user) {
    return new NextResponse("Invalid credentials", { status: 401 });
  }

  // Create JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" } // JWT expires in 1 hour
  );

  // Set token in cookie (Secure, HTTP-only, path set to `/` so it applies to the whole domain)
  const response = new NextResponse(JSON.stringify({ message: "Login successful" }));
  response.cookies.set("token", token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",  // Only secure cookies in production
    path: "/" 
  });

  return response;
}

async function authenticateUser(email: string, password: string) {
  // Simulated authentication function (replace with actual DB logic)
  const users = [
    { _id: 1, email: "test@example.com", password: "password123" }, // Example user
  ];

  return users.find(user => user.email === email && user.password === password);
}


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../../config/mongodb";
import User from "../../../models/userSchema"; 

export async function POST(request: Request) {
  const { email, password } = await request.json();

  await connectMongoDB(); // this just connects to Mongoose

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
  });

  return response;
}


//new
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb"; // adjusted for cleaner path

export async function POST(request: Request) {
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

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  // Set token in an HTTP-only cookie for client-side access and session management
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true, // Can't be accessed by JavaScript
    secure: process.env.NODE_ENV === "production", // Secure only on HTTPS
    maxAge: 60 * 60, // 1 hour
    path: "/", // Cookie is available on all routes
  });

  return response;
}



//WORKING
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export const runtime = 'nodejs'; 

export async function POST(request: Request) {
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

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  // Store token in a cookie
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 3600 });
  return response;
}
  

//WORKS
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/userSchema";
import connectMongoDB from "../../../../../config/mongodb";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  return response;
}

*/


//tut
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
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Login successful" });

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
