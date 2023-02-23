import dotenv from "dotenv";
dotenv.config();

const {
  NODE_ENV,
  SERVER_PORT,
  PG_HOST,
  PG_PORT,
  DATABASE_NAME,
  DATABASE_NAME_TEST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  BCRYPT_SALT,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env;

export default {
  sPort: SERVER_PORT,
  dbHost: PG_HOST,
  dbPort: PG_PORT,
  dbName: DATABASE_NAME,
  dbName_test: DATABASE_NAME_TEST,
  dbUser: DATABASE_USER,
  dbPassword: DATABASE_PASSWORD,
  bcryptSalt: BCRYPT_SALT,
  saltRounds: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
  env: NODE_ENV,
}; 
