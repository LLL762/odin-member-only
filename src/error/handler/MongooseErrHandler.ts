import { log } from "console";

export function handleMongooseError(error: any) {
  let output: string[] = [];

  if (error.name === "MongoServerError" && error.code === 11000) {
    const keyName = Object.keys(error.keyValue)[0];

    output.push(keyName + " " + error.keyValue[keyName] + " already taken");
  }

  return output;
}
