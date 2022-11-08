import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APP_NAME } from "../configs/GeneralConfigs";
import { RouterUris } from "../configs/RouterUri";
import { IAppUserDto } from "../dto/AppUserDto";
import { DuplicateKeyError } from "../error/DuplicateKeyError";
import { handleMongooseError } from "../error/handler/MongooseErrHandler";
import { AppUser, appUserProperties } from "../model/AppUser";
import AppUserRepo from "../repo/AppUserRepo";

const VIEW_NAME = "sign-up";

const URI = RouterUris.BASE + RouterUris.SIGN_UP;

const renderView = (
  res: Response,
  user?: IAppUserDto,
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
    const user = new AppUser(req.body as IAppUserDto);
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

export default {
  getHandler,
  postHandler,
  validationErrorHandler,
  handleError,
  URI,
};
