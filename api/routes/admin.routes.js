import { Router } from "express";
const route = Router();

import { add, login, updatePassword } from "../../services/AdminService";
import auth from "../middleware/auth";

/***************Routes************/
route.put("/add", add);
route.post("/login", login);

route.patch("/update-password", auth, updatePassword);

export default route;
