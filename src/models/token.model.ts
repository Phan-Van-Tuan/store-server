import mongoose, { Document, Schema } from "mongoose";

interface IToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: String;
  expireAt: Date;
}

const tokenSchema: Schema = new mongoose.Schema<IToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now() + 30 * 24 * 60 * 60 * 1000,
      expires: 0,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
