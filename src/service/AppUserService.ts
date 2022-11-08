import validator from "validator";
import AppUserRepo from "../repo/AppUserRepo";

const findByUsernameOrEmail = (usernameOrEmail: string) => {
  return validator.isEmail(usernameOrEmail)
    ? AppUserRepo.findByEmail(usernameOrEmail)
    : AppUserRepo.findByUsername(usernameOrEmail);
};

export default { findByUsernameOrEmail };
