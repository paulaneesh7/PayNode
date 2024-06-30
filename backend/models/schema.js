import mongoose, { Schema } from "mongoose";

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
  password: { type: Number, required: true },
});

export const User = mongoose.model("User", userSchema);
