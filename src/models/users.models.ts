import bcrypt from "bcrypt";
import { user } from "../types/user.types";
import db from "../database";
import config from "../config";

const saltrounds: number = parseInt(config.saltRounds as string);
const pepper: string | undefined = config.bcryptSalt;
export class User {
  async create(u: user): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO users (first_name,last_name,passs) VALUES ($1,$2,$3 ) 
          RETURNING *`;
      const hash = bcrypt.hashSync(u.passs + pepper, saltrounds);
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async index(): Promise<user[]> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM users `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error();
    }
  }

  async show(id: number): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = ` SELECT * FROM users WHERE id=$1 `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }

  async deleteuser(id: number): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *";
      const result = await conn.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }
  async update(u: user, id: number): Promise<user> {
    try {
      const conn = await db.connect();
      const sql =
        "UPDATE users SET first_name=($1),last_name=($2),passs=($3) WHERE id=($4) RETURNING * ";
      const hash = bcrypt.hashSync(u.passs + pepper, saltrounds);
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hash,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error();
    }
  }
}
