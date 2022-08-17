import mongoose from "mongoose";
const { Schema, model } = mongoose;

export default model(
  "PropertyTypes",
  new Schema(
    {
      name: {
        type: String,
        required: [true, "Property Type Name is required"],
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
