import { Topic } from "../model/Topic";

const findAll = async () => {
  return Topic.find({});
};

export default { findAll };
