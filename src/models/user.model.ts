import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, default: "No bio yet" },
    image: { type: String, default: "https://i.pravatar.cc/300" },
    role: { type: String, default: "user" },
    isVerify: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema, "User");
