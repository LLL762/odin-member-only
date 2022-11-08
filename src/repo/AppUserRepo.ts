import { AppUser, IAppUser } from "../model/AppUser";
import { Doc } from "../types-alias/MongooseTypes";

const findById = async (id: string) => {
  return AppUser.findOne({ id: id }).orFail().exec();
};

const findByUsername = async (username: string) => {
  return AppUser.findOne({ username: username }).orFail().exec();
};

const findByEmail = async (email: string) => {
  return AppUser.findOne({ email: email }).orFail().exec();
};

const createUser = async (user: Doc<IAppUser>) => {
  return user.save();
};

export default { findById, findByUsername, findByEmail, createUser };
