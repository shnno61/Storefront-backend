import config from "./config";
import { Pool } from "pg";

//to select between the database which we want to connect to it here
let db: Pool;
// eslint-disable-next-line prefer-const
db = new Pool({
  host: config.dbHost,
  port: parseInt(config.dbPort as string),
  database: config.env === "dev" ? config.dbName : config.dbName_test,
  user: config.dbUser,
  password: config.dbPassword,
});

export default db;
