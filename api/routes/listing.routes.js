import express from 'express';
const router = express.Router();

import auth from "../middleware/auth";

import imageUploader from "../../utils/listingImageUploader";
import videoUploader from "../../utils/listingVideoUploader";

import { getAll, get, add, del, update, filter, uploadImages, uploadVideo } from "../../services/ListingService";

// Routes
router.get("/getAll", getAll);
router.get("/get/:id", get);
router.post("/filter", filter);

router.post(
    "/upload-images",
    [auth, (...rest) => imageUploader("listing-images", 10, ...rest)],
    uploadImages
);
router.post(
    "/upload-video",
    [auth, (...rest) => videoUploader("listing-video", ...rest)],
    uploadVideo
);

router.put("/add", auth, add);
router.delete("delete/:id", auth, del);
router.patch("/update", auth, update);

export default router;
