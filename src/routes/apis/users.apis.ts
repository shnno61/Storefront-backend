import { Router } from "express";
import {
  create,
  show,
  index,
  update,
  deleteuser,
} from "../../handlers/users.handlers";
import verifyAuthToken from "../../middlewares/verifyauth.middlewares";

const users_routes = Router();
users_routes.route("/").get(verifyAuthToken, index).post(create);
users_routes.route("/:id").get(verifyAuthToken, show);
users_routes.route("/delete/:id").delete(verifyAuthToken, deleteuser);
users_routes.route("/update/:id").put(verifyAuthToken, update);

export default users_routes;
