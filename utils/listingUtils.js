import ListingTypes from "../models/ListingTypeModel"
import PropertyTypes from '../models/PropertyTypeModel'
import HeatingTypes from '../models/HeatingTypeModel'
import Users from '../models/UserModel'
import OccupationTypes from '../models/OccupationTypeModel'
import Specifications from '../models/SpecificationModel'
import RoomCharacteristics from '../models/RoomCharacteristicModel'
import Features from '../models/ListingFeatureModel'
import AccessibilityItems from "../models/AccessibilityItemModel"

export const getDetailedListing = async ({
    listingTypeId,
    propertyTypeId,
    heatingTypeId,
    occupationTypeId,
    selectedSpecifications,
    selectedRoomCharacteristics,
    selectedFeatures,
    selectedAccessibilityItems,
    author,
    ...rest
}) => {

    const getRefDetails = async (refs, Model, name) => {
        let items = [];
        for (let i = 0; i < refs.length; i++) {
            const { id, ...rest } = refs[i];
            const res = await Model.findOne({ _id: id });
            items.push({
                [name]: res,
                ...rest,
            });
        }
        return items;
    }

    const getItemDetails = async (id, Model) => {
        const response = await Model.findById(id);
        console.log(response, id)
        return response;
    }

    const listingType = await getItemDetails(
        listingTypeId,
        ListingTypes
    );
    const propertyType = await getItemDetails(
        propertyTypeId,
        PropertyTypes
    );
    const heatingType = await getItemDetails(
        heatingTypeId,
        HeatingTypes
    );
    const user = await getItemDetails(author, Users);
    const occupationType = await getItemDetails(
        occupationTypeId,
        OccupationTypes
    );
    const specifications = await getRefDetails(
        selectedSpecifications,
        Specifications,
        "specification"
    );
    const roomCharacteristics = await getRefDetails(
        selectedRoomCharacteristics,
        RoomCharacteristics,
        "roomCharacteristic"
    );
    const features = await getRefDetails(
        selectedFeatures,
        Features,
        "feature"
    );
    const accessibilityItems = await getRefDetails(
        selectedAccessibilityItems,
        AccessibilityItems,
        "accessibilityItem"
    );
    // deleting unnecessary items
    delete rest.__v;
    return {
        ...rest,
        listingType,
        propertyType,
        heatingType,
        occupationType,
        specifications,
        roomCharacteristics,
        features,
        accessibilityItems,
        author: user ? { id: user._id, name: user.name } : null,
    };
}

export const createQuery = ({
    city,
    price,
    roomSharedWith,
    listingTypeId,
    propertyTypeId,
    heatingTypeId,
    genderPreferenceId,
    location,
}) => {
    let q = {};
    if (city) q.city = city;
    if (price) {
        q.price = {};
        if (price.min) q.price.$gte = price.min;
        if (price.max) q.price.$lte = price.max;
    }
    if (roomSharedWith) q.roomSharedWith = roomSharedWith;
    if (listingTypeId) q.listingTypeId = listingTypeId;
    if (propertyTypeId) q.propertyTypeId = propertyTypeId;
    if (heatingTypeId) q.heatingTypeId = heatingTypeId;
    if (genderPreferenceId) q.genderPreferenceId = genderPreferenceId;
    if (location) {
        q.location = {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [location.long, location.lat],
                },
                $maxDistance: location.radius * 1000,
            },
        };
    }

    return q;
}

export const filterListings = (
    raw,
    { roomCharacteristics: rc, specifications: specs, features }
) => {

    const findIndexInArr = (arr, obj) => {
        for (let i in arr) {
            if (
                arr.hasOwnProperty(i) &&
                arr[i].id === obj.id &&
                arr[i].value === obj.value
            ) { return i }
        }
        return -1;
    }

    const filterByRoomCharacteristics = (unfiltered, rc) => unfiltered.filter((l) => {
        if (!l.selectedRoomCharacteristics) return false;
        let valid = true;
        for (i in rc) {
            let index = findIndexInArr(l.selectedRoomCharacteristics, rc[i]);
            if (index === -1) {
                valid = false;
                break;
            }
        }
        return valid;
    });

    const filterBySpecifications = (unfiltered, specs) => unfiltered.filter((l) => {
        if (!l.selectedSpecifications) return;

        let valid = true;
        for (i in specs) {
            let index = findIndexInArr(l.selectedSpecifications, specs[i]);
            if (index === -1) {
                valid = false;
                break;
            }
        }
        return valid;
    });

    const filterByFeatures = (unfiltered, features) => unfiltered.filter((l) => {
        if (!l.selectedFeatures) return;

        let valid = true;
        for (i in features) {
            let index = findIndexInArr(l.selectedFeatures, features[i]);
            if (index === -1) {
                valid = false;
                break;
            }
        }
        return valid;
    });

    const filteredByRoomCharacteristics = filterByRoomCharacteristics(raw, rc);
    return filterByFeatures(
        filterBySpecifications(filteredByRoomCharacteristics, specs),
        features
    );
}
