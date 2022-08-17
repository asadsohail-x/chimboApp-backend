import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "Specifications",
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Specification Name is required"],
        unique: true,
      },
      type: {
        type: String,
        required: [true, "Specification Type is required"],
      },
    },
    {
      timestamps: true,
    }
  )
);
