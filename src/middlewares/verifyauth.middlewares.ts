import { Request, Response, NextFunction } from "express";
import config from "../config";
const jwt = require("jsonwebtoken");

//Authorization: Basic <token>
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string = req.headers.authorization as string;
    const token = authorizationHeader;
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).json("Access denied, invalid token");
  }
};
export default verifyAuthToken;
