/*
import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  console.log("POST route hit");  

  const { owner, item, quantity, url } = await request.json();
  console.log("Received data:", { owner, item, quantity, url });

  //Check for missing fields
  if (!owner || !item || !quantity || !url) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  await connectMongoDB();

  //Check if item with the same name already exists in the pantry
  const existingItem = await Item.findOne({ item });

  if (existingItem) {
    console.log("Item already exists in pantry:", existingItem);
    return NextResponse.json({ message: "Item already exists in pantry", existingItem }, { status: 400 });
  }

  //Create and save the new item
  const newItem = new Item({ owner, item, quantity, url });
  await newItem.save();

  console.log("Item saved:", newItem); 

  return NextResponse.json({ message: "Item added successfully", newItem }, { status: 201 });
}
export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items });
  }

  

//WORKS!
import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  console.log("POST route hit");

  // Get the token from cookies to identify the owner (user)
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = jwt.decode(token);

  if (!decoded?.username) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  const { item, quantity, url } = await request.json();
  console.log("Received data:", { item, quantity, url });

  // Check for missing fields
  if (!item || !quantity || !url) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  await connectMongoDB();

  // Check if item with the same name already exists in the pantry
  const existingItem = await Item.findOne({ item, owner: decoded.username });

  if (existingItem) {
    console.log("Item already exists in pantry:", existingItem);
    return NextResponse.json({ message: "Item already exists in pantry", existingItem }, { status: 400 });
  }

  // Create and save the new item with the owner's username as the owner
  const newItem = new Item({
    owner: decoded.username, // The owner is set as the decoded username from the token
    item,
    quantity,
    url,
  });

  await newItem.save();
  console.log("Item saved:", newItem);

  return NextResponse.json({ message: "Item added successfully", newItem }, { status: 201 });
}

export async function GET(request: NextRequest) {
  // Get the token from cookies to identify the owner (user)
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded: any = jwt.decode(token);

  if (!decoded?.username) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  await connectMongoDB();

  // Fetch items belonging to the authenticated user (filter by owner)
  const items = await Item.find({ owner: decoded.username });

  return NextResponse.json({ items });
}
*/

import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// POST method for adding items
export async function POST(request: NextRequest) {
  console.log("POST route hit");

  // Get the token from cookies to identify the owner (user)
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded?.username) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    const { item, quantity, url } = await request.json();
    console.log("Received data:", { item, quantity, url });

    // Check for missing fields
    if (!item || !quantity || !url) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    // Check if item with the same name already exists in the pantry
    const existingItem = await Item.findOne({ item, owner: decoded.username });

    if (existingItem) {
      console.log("Item already exists in pantry:", existingItem);
      return NextResponse.json({ message: "Item already exists in pantry", existingItem }, { status: 400 });
    }

    // Create and save the new item with the owner's username as the owner
    const newItem = new Item({
      owner: decoded.username, // The owner is set as the decoded username from the token
      item,
      quantity,
      url,
    });

    await newItem.save();
    console.log("Item saved:", newItem);

    return NextResponse.json({ message: "Item added successfully", newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Token verification failed", error: error.message }, { status: 403 });
  }
}

// GET method for fetching items
export async function GET(request: NextRequest) {
  // Get the token from cookies to identify the owner (user)
  //const cookieStore = cookies();
  //const token = cookieStore.get("token")?.value;
  const token = request.cookies.get("token")?.value;
  console.log("token in GET:", token); // 👈 debug

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    console.log("Token:", token);
    console.log("Decoded:", decoded);
    if (!decoded?.username) {
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }

    await connectMongoDB();

    // Fetch items belonging to the authenticated user (filter by owner)
    const items = await Item.find({ owner: decoded.username });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ message: "Token verification failed", error: error.message }, { status: 403 });
  }
}
