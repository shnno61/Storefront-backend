import { Router } from "express";
import {
  start_order,
  add_product_to_order,
  show,
  index,
  done,
  current,
  completed,
  romove_product_from_order,
} from "../../handlers/orders.handlers";
import verifyAuthToken from "../../middlewares/verifyauth.middlewares";

const orders_routes = Router();
orders_routes
  .route("/")
  .get(verifyAuthToken, index)
  .post(verifyAuthToken, add_product_to_order);
orders_routes
  .route("/:id")
  .get(verifyAuthToken, show)
  .put(verifyAuthToken, done);
orders_routes.route("/:id").delete(verifyAuthToken, romove_product_from_order);
orders_routes.route("/:id/active").get(verifyAuthToken, current);
orders_routes.route("/:id/completed").get(verifyAuthToken, completed);
orders_routes.route("/users/:id").put(verifyAuthToken, start_order);

export default orders_routes;
