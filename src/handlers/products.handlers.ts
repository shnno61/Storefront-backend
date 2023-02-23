import { Request, Response, NextFunction } from "express";
import { product } from "../types/product.types";
import { Product } from "../models/products.models";

const product1 = new Product();

const getProductData = (req: Request): product => {
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as string;
  const id = req.body.id as number;
  const product2: product = {
    name: name,
    price: price,
    category: category,
  };
  return product2;
};

export const create = async (req: Request, res: Response) => {
  try {
    const product3: product = getProductData(req);
    const created = await product1.create(product3);
    res.status(200).json({
      status: "success",
      message: "created product successfuly",
      informations: created,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "falid", message: "unable to create this product " });
  }
};

export const index = async (_req: Request, res: Response) => {
  try {
    const products = await product1.index();
    res.status(200).json({
      status: "success",
      message: "all products in store",
      informations: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "falid",
      message: "unable to show products in the store ",
    });
  }
};

export const top = async (_req: Request, res: Response) => {
  try {
    const products = await product1.top();
    res.status(200).json({
      status: "success",
      message: "top 5 products in store",
      informations: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "falid",
      message: "unable to show top 5 products in the store ",
    });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await product1.show(parseInt(req.params.id as string));
    if (product) {
      res.status(200).json({
        status: "success",
        message: "specific product in store",
        data: product,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      status: "falid",
      message: "cannot show this product in the store",
    });
  }
};

export const category = async (req: Request, res: Response) => {
  try {
    const products = await product1.category(req.query.category as string);
    res.status(200).json({
      status: "success",
      message: "  products in this category in the store ",
      informations: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "falid",
      message: " there is no products in this category in the store ",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const product4: product = getProductData(req);
    const result = await product1.update(
      product4,
      parseInt(req.params.id as string)
    );
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
      .json({ status: "falid", message: "cannot update this product " });
  }
};

export const deleteproduct = async (req: Request, res: Response) => {
  try {
    const result = await product1.deleteproduct(
      parseInt(req.params.id as string)
    );
    if (result) {
      res
        .status(200)
        .json({ status: "success", message: " deleted successfully" });
    } else {
      throw new Error();
    }
  } catch (error) {
    res
      .status(404)
      .json({ status: "falid", message: "cannot delete this product " });
  }
};
