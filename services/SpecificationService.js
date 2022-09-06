import Specifications from "../models/SpecificationModel";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res) => {
  const existing = await Specifications.findOne({ name: req.body.name });
  if (existing) {
    return res.json({
      success: false,
      message: "Specification with this name already exists",
    });
  }

  const specification = await Specifications.create({ ...req.body });
  if (!specification) {
    return res.json({
      success: false,
      message: "Specification could not be created",
    });
  }

  return res.json({
    success: true,
    message: "Specification added successfully",
    specification,
  });
});

export const update = catchAsync(async (req, res) => {
  const existing = await Specifications.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Specification not found",
    });
  }

  const specification = await Specifications.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      type: req.body.type,
    },
    { new: true }
  );

  if (specification) {
    return res.json({
      success: true,
      message: "Specification updated successfully",
      specification,
    });
  }

  return res.json({
    success: false,
    message: "Specification could not be updated",
  });
});

export const getAll = catchAsync(async (req, res) => {
  const specifications = await Specifications.find();
  if (specifications.length > 0) {
    return res.json({
      success: true,
      message: "Specifications found",
      specifications,
    });
  }
  return res.json({
    success: false,
    message: "Specifications Not found",
  });
});

export const get = catchAsync(async (req, res) => {
  const specification = await Specifications.findOne({ _id: req.params.id });
  if (!specification) {
    return res.json({
      success: false,
      message: "Specification Not found",
    });
  }

  return res.json({
    success: true,
    message: "Specification found",
    specification,
  });
});

export const del = catchAsync(async (req, res) => {
  const existing = await Specifications.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Speicfication not found",
    });
  }

  const specification = await Specifications.findByIdAndDelete(existing._id);
  if (!specification) {
    return res.json({
      success: false,
      message: "Specification could not be deleted",
    });
  }

  return res.json({
    success: true,
    message: "Speicfication deleted successfully",
    specification,
  });
});
