import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  region: {
    type: {
      type: String,
      enum: ['Polygon'], 
      required: true
    },
    coordinates: {
      type: [[[Number]]], 
      required: true,
      validate: {
        validator: function (coords) {
          // Ensures the first and last coordinate pairs are the same to close the polygon
          const firstPoint = coords[0][0];
          const lastPoint = coords[0][coords[0].length - 1];
          return (
            firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]
          );
        },
        message: 'Polygon must be a closed loop'
      }
    }
  }
});

// Create a Mongoose model
const areaModel = mongoose.model('Area', areaSchema);

export default areaModel;
