import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Item from "./../../../models/itemSchema";

interface RouteParams {
    params: { id: string };
  }

export async function PUT(request:NextRequest, { params}:RouteParams ) {
  const { id } = await params;
  const { owner: owner, item: item, quantity: quantity, url: url } = await request.json();
  await connectMongoDB();
  await Item.findByIdAndUpdate(id, { owner, item, quantity, url });
  return NextResponse.json({ message: "Item updated" }, { status: 200 });
}

export async function GET(request:NextRequest, { params }:RouteParams) {
  const { id } = await params;
  await connectMongoDB();
  const item = await Item.findOne({ _id: id });
  return NextResponse.json({ item }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("DELETE route called with ID:", params.id);
  try {
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    await connectMongoDB();

    // Convert to ObjectId
    const deletedItem = await Item.findByIdAndDelete(new mongoose.Types.ObjectId(id));

    if (!deletedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
