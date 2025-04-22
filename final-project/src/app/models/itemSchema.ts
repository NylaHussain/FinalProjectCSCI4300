import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
  owner: number;
  item: string;
  quantity: string;
  url: string;
}

const itemSchema = new Schema<IItem>({
  owner: {
    type: Number,
  },
  item: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema, "item");
export default Item;
