import { NextFunction, Request, Response } from "express";
import { RouterUris } from "../configs/RouterUri";

const routeWhiteList: string[] = [
  RouterUris.BASE + RouterUris.LOG_IN,
  RouterUris.BASE + RouterUris.SIGN_UP,
];

const filter = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user && !routeWhiteList.includes(req.url)) {
    res.redirect(RouterUris.BASE + RouterUris.LOG_IN);
  } else {
    next();
  }
};

export default { filter };
