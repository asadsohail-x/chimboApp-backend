import HeatingTypes from "../models/HeatingTypeModal";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res, next) => {
  const existing = await HeatingTypes.findOne({ name: req.body.name });
  if (existing) {
    return res.status(201).json({
      success: false,
      message: "Heating Type with this name already exists",
    });
  }

  const heatingType = await HeatingTypes.create({ ...req.body });
  if (!heatingType) {
    return res.status(201).json({
      success: false,
      message: "Heating Type could not be created",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Heating Type added successfully",
    heatingType,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const existing = await HeatingTypes.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Heating Type not found",
    });
  }

  const heatingType = await HeatingTypes.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (heatingType) {
    return res.status(200).json({
      success: true,
      message: "Heating Type updated successfully",
      heatingType,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Heating Type could not be updated",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const heatingTypes = await HeatingTypes.find();
  if (heatingTypes.length > 0) {
    return res.status(201).json({
      success: true,
      message: "Heating Types found",
      heatingTypes,
    });
  }
  return res.status(201).json({
    success: false,
    message: "Heating Types Not found",
  });
});

export const get = catchAsync(async (req, res, next) => {
  const heatingType = await HeatingTypes.findOne({ _id: req.params.id });
  if (!heatingType) {
    return res.status(201).json({
      success: false,
      message: "Heating Type Not found",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Heating Type found",
    heatingType,
  });
});

export const del = catchAsync(async (req, res, next) => {
  const existing = await HeatingTypes.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Heating Type not found",
    });
  }

  const heatingType = await HeatingTypes.findByIdAndDelete(existing._id);
  if (!heatingType) {
    return res.json({
      success: false,
      message: "Heating Type could not be deleted",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Heating Type deleted successfully",
    heatingType,
  });
});
