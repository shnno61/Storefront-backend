import { product as type_product } from "./product.types";
export type order = {
  id?: number;
  user_id?: number;
  status?: string;
  order_id?: number;
  product_id?: number;
  quantity?: number;
};
