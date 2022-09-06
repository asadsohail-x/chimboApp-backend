import SavedSearches from "../models/SavedSearchModel";
import catchAsync from "../utils/catchAsync";

export const add = catchAsync(async (req, res) => {
    const { query, userId } = req.body;
    const existing = await SavedSearches.findOne({ query, userId });

    if (existing) {
        return res.json({
            success: false,
            message: "Saved Search with already exists",
        });
    }

    const savedSearch = await SavedSearches.create({ query, userId });
    if (!savedSearch) {
        return res.json({
            success: false,
            message: "Saved Search could not be created",
        });
    }

    return res.json({
        success: true,
        message: "Saved Search added successfully",
        savedSearch,
    });
});

export const getAll = catchAsync(async (_, res) => {
    const savedSearches = await SavedSearches.find();
    if (savedSearches.length > 0) {
        return res.json({
            success: true,
            message: "Saved Searches found",
            savedSearches,
        });
    }
    return res.json({
        success: false,
        message: "Saved Searches Not found",
    });
});

export const getByUser = catchAsync(async (req, res) => {
    const savedSearches = await SavedSearches.find({ userId: req.params.userId });
    if (savedSearches.length > 0) {
        return res.json({
            success: true,
            message: "Saved Searches found",
            savedSearches,
        });
    }
    return res.json({
        success: false,
        message: "Saved Searches Not found",
    });
});

export const get = catchAsync(async (req, res) => {
    const savedSearch = await SavedSearches.findOne({ _id: req.params.id });
    if (!savedSearch) {
        return res.json({
            success: false,
            message: "Saved Search not found",
        });
    }

    return res.json({
        success: true,
        message: "Saved Search found",
        savedSearch,
    });
});

export const del = catchAsync(async (req, res) => {
    const existing = await SavedSearches.findOne({ _id: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            message: "Saved Search not found",
        });
    }

    const deleted = await SavedSearches.findByIdAndDelete(existing._id);
    if (!deleted) {
        return res.json({
            success: false,
            message: "Saved Search could not be deleted",
        });
    }

    return res.status(201).json({
        success: true,
        message: "Saved Search deleted successfully",
        savedSearch: deleted,
    });
});
