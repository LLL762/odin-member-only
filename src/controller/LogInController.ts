import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import v from "../validation/ValidationUtility";

const VIEW_NAME = "log-in";
const URI = RouterUris.BASE + RouterUris.LOG_IN;
const REQ_BODY_SCHEMA = {
  username: "",
  password: "",
};

const renderView = (res: Response, status?: number, messages?: string[]) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: "Log in",
    postUri: URI,
    messages: messages,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  const session: any = req.session;

  req.isAuthenticated()
    ? res.redirect(RouterUris.BASE + RouterUris.INDEX)
    : renderView(res, 200, session?.messages);
};

const validateReqBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  v.haveSameKeys(REQ_BODY_SCHEMA, req.body)
    ? next()
    : renderView(res, 400, ["Invalid request"]);

export default { URI, getHandler, validateReqBody };
