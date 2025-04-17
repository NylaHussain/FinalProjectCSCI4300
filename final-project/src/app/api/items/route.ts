import connectMongoDB from "../../../../config/mongodb";
import Item from "@/app/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  const { item, quantity, url } = await request.json();
  await connectMongoDB();
  await Item.create({ item, quantity, url });
  return NextResponse.json({ message: "Item added successfully" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items });
  }
