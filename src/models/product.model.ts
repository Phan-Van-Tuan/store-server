import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  storeId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  categories: { categoryId: mongoose.Schema.Types.ObjectId; name: String }[];
}

const productSchema: Schema = new mongoose.Schema<IProduct>(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    categories: [
      {
        categoryId: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
