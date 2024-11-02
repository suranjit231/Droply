import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     // Supplier-specific fields
     name: {
        type: String,
    },
  
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Contact number must be exactly 10 digits."],
        maxlength: [10, "Contact number must be exactly 10 digits."],

    },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    types: {
        type: String,
        enum: ["users", "suppliers"],
        default: "users"
    },
   
   
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
