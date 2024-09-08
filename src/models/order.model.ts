import mongoose from "mongoose";

interface IOrder {
  userId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
