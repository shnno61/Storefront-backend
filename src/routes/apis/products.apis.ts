import { Router } from "express";
import {
  create,
  show,
  index,
  top,
  category,
  update,
  deleteproduct,
} from "../../handlers/products.handlers";
import verifyAuthToken from "../../middlewares/verifyauth.middlewares";

const products_routes = Router();
products_routes.route("/").get(index).post(verifyAuthToken, create);
products_routes.route("/:id").get(show);
products_routes.route("/top/5").get(top);
products_routes.route("/in/category").get(category);
products_routes.route("/update/:id").put(verifyAuthToken, update);
products_routes.route("/delete/:id").delete(verifyAuthToken, deleteproduct);

export default products_routes;
