import { Router } from "express";
import users_routes from "./apis/users.apis";
import products_routes from "./apis/products.apis";
import orders_routes from "./apis/orders.apis";
const routes = Router();
routes.use("/users", users_routes);
routes.use("/products", products_routes);
routes.use("/orders", orders_routes);

export default routes;
