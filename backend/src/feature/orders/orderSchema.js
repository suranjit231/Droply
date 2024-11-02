// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", required: true

    },

 timeOfRegistration: { 
    type: Number,
    default: Date.now
 },

  quantity: {
    type: Number,
    required: true
 },
 
  orderStatus: { 
    type: String,
    enum:["pending", "delivered", "cancel"],
    default: "Pending" 
}
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;