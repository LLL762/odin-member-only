import { NextFunction } from "express";
import { DuplicateKeyError } from "../DuplicateKeyError";

export async function handleMongooseError(error: any, next: NextFunction) {
  console.log(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(
      new DuplicateKeyError(`${error.keyValue.join(", ")} are already taken`)
    );
  } else {
    next(error);
  }
}
