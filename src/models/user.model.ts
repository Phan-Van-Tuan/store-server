import mongoose, { Document, Schema } from "mongoose";

// Interface kế thừa từ mongoose.Document để tương thích với Mongoose
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio?: string;
  image?: string;
  role?: "user" | "store" | "admin" | "driver";
  isVerify?: boolean;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "No bio yet" },
    image: { type: String, default: "https://i.pravatar.cc/300" },
    role: {
      type: String,
      enum: ["user", "store", "admin", "driver"],
      default: "user",
    },
    isVerify: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
