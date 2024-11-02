// models/Inventory.js
import mongoose from "mongoose";

// ==== ( first latitude: and seconds longtitude: ) ========//

const inventorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true

  },

  capacity:{
    type:Number,
    required:true,

  },

  textLocation:{
    type:String,
  },

  coordinates: {
    latitude: Number,
    longitude: Number
  }
},{timestamps:true});


const inventoryModel = mongoose.model("Inventory", inventorySchema);

export default inventoryModel;
