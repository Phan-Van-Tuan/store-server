import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  amount: number;
  method: "credit_card" | "paypal" | "bank_transfer";
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

const paymentSchema: Schema = new mongoose.Schema<IPayment>({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: { type: Number, required: true },
  method: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
