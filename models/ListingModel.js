import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const listingSchema = Schema({
  listingTypeId: {
    type: Types.ObjectId,
    required: true,
  },
  propertyTypeId: {
    type: Types.ObjectId,
    required: true,
  },
  videoPath: {
    type: String,
    required: false,
  },
  video3DPath: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetNo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  heatingTypeId: {
    type: Types.ObjectId,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  roomSharedWith: {
    type: Number,
    required: false,
  },
  currentResidentCount: {
    type: Number,
    required: false,
  },
  isOwnerLivingInProperty: {
    type: Boolean,
    required: true,
  },
  genderPreferenceId: {
    type: Object,
    required: false,
  },
  occupationTypeId: {
    type: Types.ObjectId,
    required: false,
  },
  minStay: {
    type: Number,
    required: true,
  },
  communityFee: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  selectedSpecifications: {
    type: Array,
    required: true,
  },
  imagePaths: {
    type: Array,
    required: true,
  },
  selectedRoomCharacteristics: {
    type: Array,
    required: true,
  },
  selectedFeatures: {
    type: Array,
    required: true,
  },
  selectedAccessibilityItems: {
    type: Array,
    required: true,
  },
  location: {
    type: { type: String },
    coordinates: [],
  },
  author: {
    type: Types.ObjectId,
    required: true,
  },
});

listingSchema.index({ location: "2dsphere" });

export default model("Listing", listingSchema);
