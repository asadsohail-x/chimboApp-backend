import ListingFeatures from "../models/ListingFeatureModel";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res, next) => {
  const existing = await ListingFeatures.findOne({ name: req.body.name });
  if (existing) {
    return res.json({
      success: false,
      message: "Listing Feature with this name already exists",
    });
  }

  const listingFeature = await ListingFeatures.create({ ...req.body });
  if (!listingFeature) {
    return res.json({
      success: false,
      message: "Listing Feature could not be created",
    });
  }

  return res.json({
    success: true,
    message: "Listing Feature added successfully",
    listingFeature,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const existing = await ListingFeatures.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Listing Feature not found",
    });
  }

  const listingFeature = await ListingFeatures.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (listingFeature) {
    return res.json({
      success: true,
      message: "Listing Feature updated successfully",
      listingFeature,
    });
  }

  return res.json({
    success: false,
    message: "Listing Feature could not be updated",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const listingFeatures = await ListingFeatures.find();
  if (listingFeatures.length > 0) {
    return res.json({
      success: true,
      message: "Listing Features found",
      listingFeatures,
    });
  }
  return res.json({
    success: false,
    message: "Listing Feature Not found",
  });
});

export const get = catchAsync(async (req, res, next) => {
  const listingFeature = await ListingFeatures.findOne({ _id: req.params.id });
  if (!listingFeature) {
    return res.json({
      success: false,
      message: "Listing Feature Not found",
    });
  }

  return res.json({
    success: true,
    message: "Listing Feature found",
    listingFeature,
  });
});

export const del = catchAsync(async (req, res, next) => {
  const existing = await ListingFeatures.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Listing Feature not found",
    });
  }

  const listingFeature = await ListingFeatures.findByIdAndDelete(existing._id);
  if (!listingFeature) {
    return res.json({
      success: false,
      message: "Listing Feature could not be deleted",
    });
  }

  return res.json({
    success: true,
    message: "Listing Feature deleted successfully",
    listingFeature,
  });
});
