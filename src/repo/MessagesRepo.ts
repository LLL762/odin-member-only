import { IMesssage } from "../model/Message";
import { Doc } from "../types-alias/MongooseTypes";

const createMsg = async (msg: Doc<IMesssage>) => {
  return msg.save();
};
