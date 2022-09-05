import RoomCharacteristics from "../models/SpecificationModel";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res, next) => {
  const existing = await RoomCharacteristics.findOne({ name: req.body.name });
  if (existing) {
    return res.json({
      success: false,
      message: "Room Characteristics with this name already exists",
    });
  }

  const roomCharacteristic = await RoomCharacteristics.create({ ...req.body });
  if (!roomCharacteristic) {
    return res.json({
      success: false,
      message: "Room Characteristic could not be created",
    });
  }

  return res.json({
    success: true,
    message: "Room Characteristic added successfully",
    roomCharacteristic,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const existing = await RoomCharacteristics.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Room Characteristic not found",
    });
  }

  const roomCharacteristic = await RoomCharacteristics.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      type: req.body.type,
    },
    { new: true }
  );

  if (roomCharacteristic) {
    return res.json({
      success: true,
      message: "Room Characteristics updated successfully",
      roomCharacteristic,
    });
  }

  return res.json({
    success: false,
    message: "Room Characteristics could not be updated",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const roomCharacteristics = await RoomCharacteristics.find();
  if (roomCharacteristics.length > 0) {
    return res.json({
      success: true,
      message: "Room Characteristics found",
      roomCharacteristics,
    });
  }
  return res.json({
    success: false,
    message: "Room Characteristics Not found",
  });
});

export const get = catchAsync(async (req, res, next) => {
  const roomCharacteristic = await RoomCharacteristics.findOne({
    _id: req.params.id,
  });
  if (!roomCharacteristic) {
    return res.json({
      success: false,
      message: "Room Characteristics Not found",
    });
  }

  return res.json({
    success: true,
    message: "Room Characteristics found",
    roomCharacteristic,
  });
});

export const del = catchAsync(async (req, res, next) => {
  const existing = await RoomCharacteristics.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      message: "Room Characteristics not found",
    });
  }

  const roomCharacteristic = await RoomCharacteristics.findByIdAndDelete(
    existing._id
  );
  if (!roomCharacteristic) {
    return res.json({
      success: false,
      message: "Room Characteristics could not be deleted",
    });
  }

  return res.json({
    success: true,
    message: "Room Characteristics deleted successfully",
    roomCharacteristic,
  });
});
