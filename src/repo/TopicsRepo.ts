import { ITopic, Topic } from "../model/Topic";
import { Doc } from "../types-alias/MongooseTypes";

const findAll = async () => {
  return Topic.find({});
};

const findById = async (id: string) => {
  return Topic.findById(id);
};

const createTopic = async (topic: Doc<ITopic>) => {
  return topic.save();
};

export default { findAll, findById, createTopic };
