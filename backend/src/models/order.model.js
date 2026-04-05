import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tenantId: String
});

export const Order = mongoose.model("Order", orderSchema);