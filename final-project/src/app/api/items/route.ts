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
