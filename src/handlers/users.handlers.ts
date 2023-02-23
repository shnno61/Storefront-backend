import { Request, Response, NextFunction } from "express";
import { user } from "../types/user.types";
import { User } from "../models/users.models";
const jwt = require("jsonwebtoken");
import config from "../config";

const user1 = new User();

const getUserData = (req: Request): user => {
  const fn = req.body.first_name as string;
  const ln = req.body.last_name as string;
  const ps = req.body.passs as string;
  const id = req.body.id as number;
  const user2: user = {
    first_name: fn,
    last_name: ln,
    passs: ps,
  };
  return user2;
};
export const create = async (req: Request, res: Response) => {
  try {
    const user3: user = getUserData(req);
    const created = await user1.create({
      first_name: user3.first_name,
      last_name: user3.last_name,
      passs: user3.passs,
    });
    const token = jwt.sign({ user: created }, config.jwtSecret);
    res.status(200).json({
      status: "success",
      message: "created user successfuly",
      data: created,
      token: token,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "falid", message: "cannot create this user " });
  }
};

export const index = async (_req: Request, res: Response) => {
  try {
    const users: user[] = await user1.index();
    res
      .status(200)
      .json({ status: "success", message: "all usres in store", data: users });
  } catch (error) {
    res
      .status(500)
      .json({ status: "falid", message: "cannot show users in the store " });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const user: user = await user1.show(parseInt(req.params.id as string));

    if (user) {
      res.status(200).json({
        status: "success",
        message: "specific user in store",
        data: user,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      status: "falid",
      message: "this user is not found the in store",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user4: user = getUserData(req);
    const result = await user1.update(user4, parseInt(req.params.id as string));
    if (result) {
      res.status(200).json({
        status: "success",
        message: " updated successfully",
        data: result,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: "falid", message: "cannot update this user " });
  }
};

export const deleteuser = async (req: Request, res: Response) => {
  try {
    const result = await user1.deleteuser(parseInt(req.params.id as string));
    if (result) {
      res.status(200).json({
        status: "success",
        message: " deleted successfully",
        data: result,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "falid", message: "cannot delete this user " });
  }
};
