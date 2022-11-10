import { IMesssage, Message } from "../model/Message";
import { Doc } from "../types-alias/MongooseTypes";
import TopicsRepo from "../repo/TopicsRepo";
import { Topic } from "../model/Topic";

const postMessage = async (message: Doc<IMesssage>, topicId: string) => {
  const topic = await Topic.findById(topicId).orFail().exec();
  message.topic = topic;
  const savedMsg = await message.save();
  return TopicsRepo.addMsg(topic._id.toString(), savedMsg);
};

const deleteMessage = async (msgId: string) => {
  const message = await Message.findByIdAndDelete(msgId)
    .populate("topic", "_id")
    .orFail()
    .exec();
  return TopicsRepo.deleteMsg(message.topic._id.toString(), msgId);
};

/* const postMessage = async (message: Doc<IMesssage>, topicId: string) => {
  const session = await mongoose.connection.startSession();

  session.startTransaction();
  try {
    const topic = await Topic.findById(topicId).orFail().exec();
    message.topic = topic;

    const savedMsg = await message.save({ session: session });
    const savedTopic = await TopicsRepo.addMsg(topicId, savedMsg, session);
    await session.commitTransaction();
    return savedTopic;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}; */

export default { postMessage, deleteMessage };
