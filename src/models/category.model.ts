import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema: Schema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
