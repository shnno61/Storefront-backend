import { product } from "../types/product.types";
import db from "../database";

export class Product {
  async create(p: product): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING * `;
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async index(): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT *  FROM products `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async show(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM products WHERE id=$1 `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async category(category: string): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM products WHERE category=($1) `;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async top(): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM products ORDER BY price DESC LIMIT 5 `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async deleteproduct(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }
  async update(p: product, id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = `UPDATE products SET name=($1),price=($2),category=($3) WHERE id=($4) RETURNING * `;
      const result = await conn.query(sql, [p.name, p.price, p.category, id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }
}
