import { Strategy } from "passport-local";
import AppUserService from "../service/AppUserService";
import bcrypt from "bcryptjs";
import { Error } from "mongoose";
import AppUserRepo from "../repo/AppUserRepo";

const STRATEGY = new Strategy(async (username, password, done) => {
  try {
    const user = await AppUserService.findByUsernameOrEmail(username);
    const arePasswordsMatching = await bcrypt.compare(password, user.password);
    return arePasswordsMatching
      ? done(null, user)
      : done(null, false, { message: "Incorrect credentials" });
  } catch (err) {
    return err instanceof Error.DocumentNotFoundError
      ? done(null, false, { message: "Incorrect credentials" })
      : done(err);
  }
});

const serializeAppUser = (user: any, done: any) => {
  done(null, user._id);
};

const deserializeAppUser = async (id: string, done: any) => {
  try {
    const user = await AppUserRepo.findById(id);
    user.password = "?";
    done(null, user);
  } catch (err) {
    done(err);
  }
};

export default { STRATEGY, serializeAppUser, deserializeAppUser };
