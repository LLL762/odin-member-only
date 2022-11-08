import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APP_NAME } from "../configs/GeneralConfigs";
import { RouterUris } from "../configs/RouterUri";
import { handleMongooseError } from "../error/handler/MongooseErrHandler";
import { AppUser, appUserProperties, IAppUser } from "../model/AppUser";
import AppUserRepo from "../repo/AppUserRepo";
import v from "../validation/ValidationUtility";

const VIEW_NAME = "sign-up";
const URI = RouterUris.BASE + RouterUris.SIGN_UP;
const REQ_BODY_SCHEMA = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstname: "",
  lastname: "",
};

const renderView = (
  res: Response,
  user?: IAppUser,
  status?: number,
  messages?: string[]
) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: APP_NAME,
    postUri: RouterUris.SIGN_UP,
    maxLength: appUserProperties.defaultMaxLength,
    minLength: appUserProperties.defaultMinLength,
    user: user,
    messages: messages,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    renderView(res);
  } catch (err) {
    next(err);
  }
};

const validationErrorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const msg = errors.array().map((v) => v.msg);

  errors.isEmpty() ? next() : renderView(res, req.body, 422, msg);
};

const postHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as IAppUser;
    console.log("7777777777777777777");

    const user = new AppUser(body);
    const savedUser = await AppUserRepo.createUser(user);
    res.redirect(RouterUris.BASE + RouterUris.USERS + "/" + savedUser._id);
  } catch (err) {
    next(err);
  }
};

const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = handleMongooseError(err);
  errors.length > 0 ? renderView(res, req.body, 422, errors) : next(err);
};

const validateReqBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  v.haveSameKeys(REQ_BODY_SCHEMA, req.body)
    ? next()
    : renderView(res, req.body, 400, ["Invalid request"]);

export default {
  getHandler,
  postHandler,
  validationErrorHandler,
  handleError,
  validateReqBody,
  URI,
};
