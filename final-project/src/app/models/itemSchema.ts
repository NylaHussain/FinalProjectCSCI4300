import mongoose, { Schema, Document, Model } from "mongoose";

// Mongoose provides properties such as the _id in Document, we extend this
interface IItem extends Document {
  item: string;
  quantity: string;
  url: string;
}

const itemSchema = new Schema<IItem>({
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

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
