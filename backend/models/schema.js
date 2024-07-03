import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  firstName: { type: String, required: true, maxLength: 50 },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: { type: String, required: true },
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: Number, required: true },
});

export const Account = mongoose.model("Account", accountSchema);
export const User = mongoose.model("User", userSchema);
