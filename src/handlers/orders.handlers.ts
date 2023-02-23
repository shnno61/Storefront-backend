import { Request, Response, NextFunction } from "express";
import { order } from "../types/order.types";
import { Order } from "../models/orders.models";

const order1 = new Order();

export const start_order = async (req: Request, res: Response) => {
  try {
    const created = await order1.start_order(parseInt(req.params.id as string));
    res.status(200).json({
      status: "success",
      message: "started order successfuly",
      informations: created,
    });
  } catch (error) {
    res.status(400).json({
      status: "falid",
      message: "unable to start order in the store ",
    });
  }
};

export const add_product_to_order = async (req: Request, res: Response) => {
  try {
    const created = await order1.add_product_to_order({
      order_id: parseInt(req.body.order_id),
      product_id: parseInt(req.body.product_id),
      quantity: parseInt(req.body.quantity),
    });
    res.status(200).json({
      status: "success",
      message: "added product to order successfully",
      informations: created,
    });
  } catch (error) {
    res.status(400).json({
      status: "falid",
      message: "unable to adde this product to this order in the store ",
    });
  }
};

export const romove_product_from_order = async (
  req: Request,
  res: Response
) => {
  try {
    const deletet = await order1.romove_product_from_order(
      parseInt(req.params.id as string),
      parseInt(req.body.product_id as string)
    );
    res.status(200).json({
      status: "success",
      message: " deleted successfully",
      data: deletet,
    });
  } catch (error) {
    res.status(500).json({
      status: "falid",
      message: "cannot remove this product from the order ",
    });
  }
};

export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await order1.index();
    res.json({
      status: "success",
      message: "all orders in store",
      informations: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: "falid",
      message: "cannot show all orders in this store ",
    });
  }
};

export const current = async (req: Request, res: Response) => {
  try {
    const products = await order1.current(parseInt(req.params.id as string));
    res.status(200).json({
      status: "success",
      message: "current orders for this user",
      informations: products,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "falid", message: "cannot show current order " });
  }
};

export const completed = async (req: Request, res: Response) => {
  try {
    const products: order[] = await order1.completed(
      parseInt(req.params.id as string)
    );
    res.status(200).json({
      status: "success",
      message: "completed order(s) for this user",
      informations: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "falid",
      message: "there is no completed orders for this user",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const products: order[] = await order1.show(
      parseInt(req.params.id as string)
    );
    res.status(200).json({
      status: "success",
      message: "specific product in this order",
      informations: products,
    });
  } catch (error) {
    res.status(404).json({ status: "falid", message: "error" });
  }
};

export const done = async (req: Request, res: Response) => {
  try {
    const done: order = await order1.done(parseInt(req.params.id as string));
    res.status(200).json({
      status: "success",
      message: "completed order in store",
      informations: done,
    });
  } catch (error) {
    res.status(500).json({ status: "falid", message: "error" });
  }
};
