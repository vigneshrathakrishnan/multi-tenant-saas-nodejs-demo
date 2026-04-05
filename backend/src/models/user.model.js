import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  tenantId: String
});

userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);