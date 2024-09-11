import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

const categorySchema: Schema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
