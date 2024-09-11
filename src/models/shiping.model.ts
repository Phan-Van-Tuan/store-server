import mongoose, { Document, Schema } from "mongoose";

export interface IShipping extends Document{
  orderId: mongoose.Schema.Types.ObjectId;
  address: string;
  status: "pending" | "shipped" | "delivered";
  shippedAt: Date;
}

const shippingSchema: Schema = new mongoose.Schema<IShipping>({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  shippedAt: { type: Date },
});

const Shipping = mongoose.model<IShipping>("Shipping", shippingSchema);
export default Shipping;
