import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  freeship?: mongoose.Schema.Types.ObjectId;
  discount?: mongoose.Schema.Types.ObjectId;
  totalAmount: number;
  note?: string;
  status: "pending" | "shipped" | "wait_for_review" | "finish";
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "COD" | "vnpay";
}

const orderSchema: Schema = new mongoose.Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    freeship: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
    totalAmount: { type: Number, required: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["pending", "shipped", "wait_for_review", "finish"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "vnpay"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
