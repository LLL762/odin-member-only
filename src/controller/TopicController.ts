import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import { ITopic } from "../model/Topic";
import TopicsRepo from "../repo/TopicsRepo";

const VIEW_NAME = "topic";
const URI = RouterUris.BASE + RouterUris.TOPICS + RouterUris.PATHVAR_ID;

const renderView = (
  res: Response,
  status?: number,
  topic?: ITopic,
  isAuthenticated?: boolean,
  hasPermission?: boolean
) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: "Topics",
    topic: topic,
    authenticated: isAuthenticated,
    hasPermission: hasPermission,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = (await TopicsRepo.findById(req.params.id)) as ITopic;
    const user = req.user;

    console.log(user);

    renderView(res, 200, topic, req.isAuthenticated(), false);
  } catch (err) {
    next(err);
  }
};

export default { URI, getHandler };
