import { AppUser } from "../model/AppUser";

const findById = async (id: string) => {
  return AppUser.findOne({ id: id }).orFail().exec();
};

export default { findById };
