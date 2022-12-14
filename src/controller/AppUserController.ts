import { NextFunction, Request, Response } from "express";
import { APP_NAME } from "../configs/GeneralConfigs";
import { IAppUser } from "../model/AppUser";
import AppUserRepo from "../repo/AppUserRepo";

const renderView = (res: Response, user?: IAppUser, status?: number) => {
  res.status(status ?? 200).render("user-profile", {
    title: APP_NAME,

    user: user,
  });
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await AppUserRepo.findById(id);
    renderView(res, user);
  } catch (err) {
    next(err);
  }
};

export default { getUserById };
