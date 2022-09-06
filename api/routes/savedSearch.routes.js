import { Router } from "express";
const route = Router();
import { add, getAll, get, del, getByUser } from "../../services/SavedSearchService";
import auth from "../middleware/auth";

/***************Routes************/
route.get("/getAll", getAll);
route.get("/get/:id", get);

route.get("/getByUser/:userId", auth, getByUser);
route.put("/add", auth, add);
route.delete("/delete/:id", auth, del);

export default route;
