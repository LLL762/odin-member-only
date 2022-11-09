import { RouterUris } from "../configs/RouterUri";
import { NextFunction, Request, Response } from "express";
import { ITopic } from "../model/Topic";
import TopicsRepo from "../repo/TopicsRepo";

const VIEW_NAME = "topics";
const URI = RouterUris.BASE + RouterUris.TOPICS;

const renderView = (
  res: Response,
  status?: number,
  topics?: ITopic[],
  isAuthenticated?: boolean
) => {
  res.status(status ?? 200).render(VIEW_NAME, {
    title: "Topics",
    topicsUri: URI,
    topics: topics,
    isAuthenticated,
  });
};

const getHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await TopicsRepo.findAll();
    renderView(res, 200, topics, req.isAuthenticated());
  } catch (err) {
    next(err);
  }
};

export default { URI, getHandler };
