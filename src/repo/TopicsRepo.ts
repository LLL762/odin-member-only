import { ClientSession, ObjectId } from "mongoose";
import { IMesssage } from "../model/Message";
import { ITopic, Topic } from "../model/Topic";
import { Doc } from "../types-alias/MongooseTypes";

const findAll = async () => {
  return Topic.find({});
};

const findById = async (id: string) => {
  return Topic.findById(id).populate("messages");
};

const createTopic = async (topic: Doc<ITopic>) => {
  return topic.save();
};

const addMsg = async (topicId: string, msg: Doc<IMesssage>) => {
  return Topic.findByIdAndUpdate(topicId, {
    $push: { messages: { _id: msg._id } },
  }).orFail();
};

const deleteMsg = async (topicId: string, msgId: string) => {
  return Topic.findByIdAndUpdate(topicId, {
    $pullAll: { messages: { _id: msgId } },
  }).orFail();
};

export default { findAll, findById, createTopic, addMsg, deleteMsg };
