import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import { ITopic } from "../model/Topic";
import TopicsRepo from "../repo/TopicsRepo";
import AddMsgController from "./AddMsgController";
import LogInController from "./LogInController";

const VIEW_NAME = "topic";
const URI = RouterUris.BASE + RouterUris.TOPICS + RouterUris.PATHVAR_ID;

const renderView = (
  res: Response,
  status?: number,
  topic?: ITopic,
  postMsgUri?: string,
  isAuthenticated?: boolean,
  hasPermission?: boolean
) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: "Topics",
    postMsgUri: postMsgUri,
    topic: topic,
    authenticated: isAuthenticated,
    hasPermission: hasPermission,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = (await TopicsRepo.findById(req.params.id)) as ITopic;
    if (!req.isAuthenticated() && topic?.isNsfw) {
      res.redirect(LogInController.URI);
    }

    const user = req.user;

    renderView(
      res,
      200,
      topic,
      AddMsgController.URI.replace(":id", topic._id.toString()),
      req.isAuthenticated(),
      false
    );
  } catch (err) {
    next(err);
  }
};

export default { URI, getHandler };
