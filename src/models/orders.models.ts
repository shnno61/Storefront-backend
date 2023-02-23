import { order } from "../types/order.types";
import db from "../database";

export class Order {
  async start_order(u: number): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *`;
      const result = await conn.query(sql, [u, "active"]);
      conn.release();
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async add_product_to_order(o: order): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO orders_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *`;
      const result = await conn.query(sql, [
        o.order_id,
        o.product_id,
        o.quantity,
      ]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async romove_product_from_order(o: number, p: number): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM orders_products WHERE order_id=($1) AND product_id=($2) RETURNING * `;
      const result = await conn.query(sql, [o, p]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async index(): Promise<order[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM orders `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async current(id: number): Promise<order[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM orders WHERE status='active' AND user_id=($1) `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async completed(id: number): Promise<order[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM orders WHERE status='completed' AND user_id=($1)  `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async show(id: number): Promise<order[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT orders_products.order_id ,products.name as product_name ,products.price,
            products.category ,orders_products.quantity FROM products INNER JOIN orders_products
           ON products.id=orders_products.id  WHERE order_id=($1)  `;
      const result = await conn.query(sql, [id]);
      conn.release();
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async done(id: number): Promise<order> {
    try {
      const conn = await db.connect();
      const sql = ` UPDATE orders
          SET status = 'completed' 
          WHERE id=$1  RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }
}
