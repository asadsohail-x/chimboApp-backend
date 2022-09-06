import catchAsync from "../utils/catchAsync";

import Listings from "../models/ListingModel";

import { getDetailedListing, createQuery, filterListings } from '../utils/listingUtils'

export const getAll = catchAsync(async (req, res) => {
    const listings = await Listings.find();
    const detailedListings = []

    for (let i = 0; i < listings.length; i++) {
        detailedListings.push(
            await getDetailedListing(listings[i].toObject())
        )
    }

    if (detailedListings.length > 0) {
        return res.json({
            success: true,
            message: "Listings found",
            listings: detailedListings,
        });
    }
    return res.json({
        success: false,
        message: "Listings Not found",
    });
});

export const get = catchAsync(async (req, res) => {
    const listing = await Listings.findOne({ _id: req.params.id });
    if (!listing) {
        return res.json({
            success: false,
            message: "Listing Not found",
        });
    }
    const detailedListing = await getDetailedListing(listing.toObject());

    return res.json({
        success: true,
        message: "Listing found",
        listing: detailedListing,
    });
});

export const add = catchAsync(async (req, res) => {

    const listing = await Listings.create({ ...req.body });
    if (!listing) {
        return res.json({
            success: false,
            message: "Listing could not be created",
        });
    }

    return res.json({
        success: true,
        message: "Listing added successfully",
        listing,
    });
});

export const del = catchAsync(async (req, res) => {
    const existing = await Listings.findOne({ _id: req.params.id });
    if (!existing) {
        return res.json({
            success: false,
            message: "Listing not found",
        });
    }

    const deleted = await Listings.findByIdAndDelete(existing._id);
    if (!deleted) {
        return res.json({
            success: false,
            message: "Listing could not be deleted",
        });
    }

    return res.status(201).json({
        success: true,
        message: "Listing deleted successfully",
        listing: deleted,
    });
});

export const update = catchAsync(async (req, res) => {
    console.log(req.body.id)
    const existing = await Listings.findOne({ _id: req.body.id });
    if (!existing) {
        return res.json({
            success: false,
            message: "Listing not found",
        });
    }

    const listing = await Listings.findByIdAndUpdate(
        req.body.id,
        {
            ...req.body,
        },
        { new: true }
    );

    if (listing) {
        return res.json({
            success: true,
            message: "Listing updated successfully",
            listing,
        });
    }

    return res.json({
        success: false,
        message: "Listing could not be updated",
    });
});

export const filter = catchAsync(async (req, res) => {
    const data = req.body;
    const query = createQuery(data);
    const temp = await Listings.find(query);
    console.log("here")
    const filteredListings = filterListings(temp, data)
    console.log("here 2")
    const detailedListings = [];
    for (let i = 0; i < temp.length; i++) {
        detailedListings.push(
            await getDetailedListing(filteredListings[i].toObject())
        );
    }
    console.log("here 3")
    if (detailedListings.length <= 0) {
        return res.json({
            success: false,
            message: "Listings not found"
        })
    }
    console.log("here 4")
    return res.json({
        success: true,
        message: "Listings found",
        listings: detailedListings,
    });

})

export const uploadImages = catchAsync(async (req, res) => {
    if (!req.files.length) res.json({
        success: false,
        message: "Images not uploaded."
    });

    const images = [req.files.map((image) => image.path)];
    res.json({ success: true, message: "Images Uploaded", images });
})

export const uploadVideo = catchAsync(async (req, res) => {
    if (!req.file) res.json({
        success: false,
        message: "Video not uploaded."
    });

    const video = req.file.path;
    res.json({ success: true, message: "Video Uploaded", video });
})