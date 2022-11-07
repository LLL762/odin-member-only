import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof Error.DocumentNotFoundError) {
    res.status(404).render("404");
    return;
  }

  res.status(500).send("500");
};
