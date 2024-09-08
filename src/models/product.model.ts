import { timeStamp } from "console";
import mongoose from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
