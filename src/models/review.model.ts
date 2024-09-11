import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema: Schema = new mongoose.Schema<IReview>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReview>("Review", reviewSchema);
export default Review;
