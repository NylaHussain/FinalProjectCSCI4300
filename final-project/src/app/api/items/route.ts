import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log("POST route hit");  // Log to ensure route is being hit

  const { owner, item, quantity, url } = await request.json();
  console.log("Received data:", { owner, item, quantity, url });

  // Check for missing fields
  if (!owner || !item || !quantity || !url) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  await connectMongoDB();
  const newItem = new Item({ owner, item, quantity, url });
  await newItem.save();

  console.log("Item saved:", newItem); // Log the item after saving

  return NextResponse.json({ message: "Item added successfully", newItem }, { status: 201 });
}
// export async function POST(request: NextRequest) {
//   const { owner, item, quantity, url } = await request.json();
//   await connectMongoDB();
//   await Item.create({ owner, item, quantity, url });
//   return NextResponse.json({ message: "Item added successfully" }, { status: 201 });
// }

export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items });
  }
