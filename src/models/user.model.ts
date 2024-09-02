import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    bio: String,
    image: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema, "User");
