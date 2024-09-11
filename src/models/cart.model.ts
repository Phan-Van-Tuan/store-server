import mongoose, { Document, Schema } from "mongoose";

interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];
}

const cartSchema: Schema = new mongoose.Schema<ICart>({
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
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
