import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import MessageService from "../service/MessageService";

const URI = RouterUris.BASE + RouterUris.MESSAGES + RouterUris.PATHVAR_ID;

const deleteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topic = await MessageService.deleteMessage(req.params.id);
    res.redirect(RouterUris.BASE + RouterUris.TOPICS + "/" + topic._id);
  } catch (error) {}
};

export default { URI, deleteHandler };
