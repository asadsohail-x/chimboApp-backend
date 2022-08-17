import PropertyTypes from "../models/PropertyTypeModal";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res, next) => {
  const existing = await PropertyTypes.findOne({ name: req.body.name });
  if (existing) {
    return res.status(201).json({
      success: false,
      message: "Property Type with this name already exists",
    });
  }

  const propertyType = await PropertyTypes.create({ ...req.body });
  if (!propertyType) {
    return res.status(201).json({
      success: false,
      message: "Property Type could not be created",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Property Type added successfully",
    propertyType,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const existing = await PropertyTypes.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Property Type not found",
    });
  }

  const propertyType = await PropertyTypes.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (propertyType) {
    return res.status(200).json({
      success: true,
      message: "Property Type updated successfully",
      propertyType,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Property Type could not be updated",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const propertyTypes = await PropertyTypes.find();
  if (propertyTypes.length > 0) {
    return res.status(201).json({
      success: true,
      message: "Property Types found",
      propertyTypes,
    });
  }
  return res.status(201).json({
    success: false,
    message: "Property Types Not found",
  });
});

export const get = catchAsync(async (req, res, next) => {
  const propertyType = await PropertyTypes.findOne({ _id: req.params.id });
  if (!propertyType) {
    return res.status(201).json({
      success: false,
      message: "Property Type Not found",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Property Type found",
    propertyType,
  });
});

export const del = catchAsync(async (req, res, next) => {
  const existing = await PropertyTypes.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Property Type not found",
    });
  }

  const propertyType = await PropertyTypes.findByIdAndDelete(existing._id);
  if (!propertyType) {
    return res.json({
      success: false,
      message: "Property Type could not be deleted",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Property Type deleted successfully",
    propertyType,
  });
});
