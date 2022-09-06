import { Router } from "express";
const route = Router();
import {
  login,
  add,
  update,
  updatePassword,
  get,
  del,
  block,
  unblock,
  getAll,
  uploadPfp,
} from "../../services/UserService";

import imageUploader from "../../utils/userImageUploader";
import auth from "../middleware/auth";

/* 
  * This approach is better but I'm not using it just because it is a little bit less readable for other devs 

  **  -> Start

  // const unAuthenticatedRoute = [
  //   { path: "/login", controller: login, method: "post" },
  //   { path: "/add", controller: add, method: "put" },
  // ];

  // const authenticatedRoute = [
  //   { path: "/update", controller: update, method: "patch" },
  //   { path: "/update-password", controller: updatePassword, method: "patch" },
  //   { path: "/getAll", controller: getPaginated, method: "get" },
  //   { path: "/get/:id", controller: get, method: "get" },
  //   { path: "/delete", controller: del, method: "delete" },
  //   { path: "/updateLoc", controller: updateLoc, method: "patch" },
  //   { path: "/block", controller: block, method: "patch" },
  //   { path: "/unblock", controller: unblock, method: "patch" },
  //   {
  //     path: "/upload-pfp",
  //     controller: uploadPfp,
  //     middleware: [(...rest) => imageUploader("profile-photo", ...rest)],
  //     method: "put",
  //   },
  // ];

  // unAuthenticatedRoute.forEach(({ path, controller, method }) => {
  //   route[method](path, controller);
  // });

  // authenticatedRoute.forEach(({ path, middleware, controller, method }) => {
  //   route[method](path, middleware ? [auth, ...middleware] : auth, controller);
  // });

  **  -> End
*/

/***************Routes************/
route.get("/getAll", getAll);
route.get("/get/:id", get);
route.put("/add", add);
route.post("/login", login);

route.patch("/update", auth, update);
route.patch("/update-password", updatePassword);
route.delete("/delete/:id", auth, del);
route.patch("/block", auth, block);
route.patch("/unblock", auth, unblock);
route.put(
  "/uploadPfp",
  [auth, (...rest) => imageUploader("profile-photo", ...rest)],
  uploadPfp
);

export default route;
