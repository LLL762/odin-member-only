import { IAppUserDto } from "../dto/AppUserDto";
import { AppUser, IAppUser } from "../model/AppUser";
import { Doc } from "../types-alias/MongooseTypes";

const findById = async (id: string) => {
  return AppUser.findOne({ id: id }).orFail().exec();
};

const createUser = async (user: Doc<IAppUser>) => {
  return user.save();
};

export default { findById, createUser };
