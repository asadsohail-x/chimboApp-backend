import { Router } from "express";
const router = Router();

// import auth from "./middleware/auth";

import genderRoutes from "./routes/gender.routes";
import propertyTypeRoutes from "./routes/propertyType.routes";
import heatingTypeRoutes from "./routes/heatingType.routes";
import listingTypeRoutes from "./routes/listingType.routes";
import occupantsTypeRoutes from "./routes/occupationType.routes";
import listingFeatureRoutes from "./routes/listingFeature.routes";
import specificationRoutes from "./routes/specification.routes";
import roomCharacteristicRoutes from "./routes/roomCharacteristic.routes";
import userRoutes from "./routes/user.routes"
import accessibilityItemRoutes from "./routes/accessibilityItem.routes";

// Protected Routes
router.use("/accessibility-items", accessibilityItemRoutes)
router.use("/genders", genderRoutes);
router.use("/property-types", propertyTypeRoutes);
router.use("/heating-types", heatingTypeRoutes);
router.use("/listing-types", listingTypeRoutes);
router.use("/occupation-types", occupantsTypeRoutes);
router.use("/listing-features", listingFeatureRoutes);
router.use("/specifications", specificationRoutes);
router.use("/room-characteristics", roomCharacteristicRoutes);
router.use("/users", userRoutes)

export default router;
