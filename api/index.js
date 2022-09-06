import { Router } from "express";
const router = Router();

// import auth from "./middleware/auth";

import accessibilityItemRoutes from "./routes/accessibilityItem.routes";
import adminRoutes from './routes/admin.routes'
import genderRoutes from "./routes/gender.routes";
import heatingTypeRoutes from "./routes/heatingType.routes";
import listingFeatureRoutes from "./routes/listingFeature.routes";
import listingRoutes from './routes/listing.routes'
import listingTypeRoutes from "./routes/listingType.routes";
import occupantsTypeRoutes from "./routes/occupationType.routes";
import propertyTypeRoutes from "./routes/propertyType.routes";
import savedSearchRoutes from './routes/savedSearch.routes'
import wishListItemRoutes from './routes/wishListItem.routes'

import specificationRoutes from "./routes/specification.routes";
import roomCharacteristicRoutes from "./routes/roomCharacteristic.routes";
import userRoutes from "./routes/user.routes"

// Protected Routes
router.use("/accessibility-items", accessibilityItemRoutes)
router.use("/admin", adminRoutes)
router.use("/genders", genderRoutes);
router.use("/heating-types", heatingTypeRoutes);
router.use("/listing-features", listingFeatureRoutes);
router.use("/listings", listingRoutes)
router.use("/listing-types", listingTypeRoutes);
router.use("/occupation-types", occupantsTypeRoutes);
router.use("/property-types", propertyTypeRoutes);
router.use("/room-characteristics", roomCharacteristicRoutes);
router.use("/saved-searches", savedSearchRoutes)
router.use("/wishlist-items", wishListItemRoutes)

router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes)

export default router;
