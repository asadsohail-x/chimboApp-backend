import WishListItems from "../models/WishListItemModel";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res) => {
    const { listingId, userId } = req.body;
    const existing = await WishListItems.findOne({ listingId, userId });

    if (existing) {
        return res.json({
            success: false,
            message: "Item already added",
        });
    }

    const wishListItem = await WishListItems.create({ listingId, userId });
    if (!wishListItem) {
        return res.json({
            success: false,
            message: "Item could not be added",
        });
    }

    return res.json({
        success: true,
        message: "Item added successfully",
        wishListItem,
    });
});

export const getAll = catchAsync(async (_, res) => {
    const wishListItems = await WishListItems.find();

    if (wishListItems.length > 0) {
        return res.json({
            success: true,
            message: "Wish List Items found",
            wishListItems: wishListItems,
        });
    }
    return res.json({
        success: false,
        message: "Wish List Items Not found",
    });
});

export const getByUser = catchAsync(async (req, res) => {
    const wishListItems = await WishListItems.find({ userId: req.params.userId });

    if (wishListItems.length > 0) {
        return res.json({
            success: true,
            message: "Wish List Items found",
            wishListItems: wishListItems,
        });
    }
    return res.json({
        success: false,
        message: "Wish List Items Not found",
    });
});

export const get = catchAsync(async (req, res) => {
    const wishListItem = await WishListItems.findOne({ _id: req.params.id });

    if (wishListItem) {
        return res.json({
            success: true,
            message: "Wish List Item found",
            wishListItem: wishListItem,
        });
    }
    return res.json({
        success: false,
        message: "Wish List Item Not found",
    });
});

export const del = catchAsync(async (req, res) => {
    const existing = await WishListItems.findOne({ _id: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            message: "Wish List Item not found",
        });
    }

    const deleted = await WishListItems.findByIdAndDelete(existing._id);
    if (!deleted) {
        return res.json({
            success: false,
            message: "Wish List Item could not be deleted",
        });
    }

    return res.status(201).json({
        success: true,
        message: "Wish List Item deleted successfully",
        wishListItem: deleted,
    });
});
