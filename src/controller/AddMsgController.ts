import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import { IMesssage, Message, messageProperties } from "../model/Message";
import MessageService from "../service/MessageService";
import { AppUser, IAppUser } from "../model/AppUser";

const VIEW_NAME = "add-msg";
const URI =
  RouterUris.BASE +
  RouterUris.TOPICS +
  RouterUris.PATHVAR_ID +
  RouterUris.POST_MESSAGE;

const renderView = (
  res: Response,
  postUri: string,
  status?: number,
  message?: IMesssage,
  errs?: string[]
) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: "Post message",
    postUri: postUri,
    messageProperties: messageProperties,
    message: message,
    errs: errs,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.url);

    renderView(res, req.url);
  } catch (err) {
    next(err);
  }
};

const postHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const msg = new Message(req.body);
    msg.author = new AppUser({ username: "robert" });

    const topic = await MessageService.postMessage(msg, req.params.id);
    res.redirect(RouterUris.BASE + RouterUris.TOPICS + "/" + topic._id);
  } catch (err) {
    next(err);
  }
};

export default { URI, getHandler, postHandler };
