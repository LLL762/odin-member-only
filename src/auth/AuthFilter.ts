import { NextFunction, Request, Response } from "express";
import { RouterUris } from "../configs/RouterUri";
import AddMsgController from "../controller/AddMsgController";
import TopicController from "../controller/TopicController";
import TopicsAllController from "../controller/TopicsAllController";

const regexify = (url: string) => "^" + url.replace(/\:\w+/, "\\w+") + "$";

const whiteList = [
  {
    url: regexify(RouterUris.BASE + RouterUris.LOG_IN),
    methods: ["GET", "POST"],
  },
  {
    url: regexify(RouterUris.BASE + RouterUris.SIGN_UP),
    methods: ["GET", "POST"],
  },
  {
    url: regexify(TopicsAllController.URI),
    methods: ["GET"],
  },
  {
    url: regexify(TopicController.URI),
    methods: ["GET"],
  },
  {
    url: regexify(AddMsgController.URI),
    methods: ["GET", "POST"],
  },
];
const isRouteWhiteListed = (req: Request) => {
  for (let route of whiteList) {
    if (req.url.match(route.url)) {
      return route.methods.includes(req.method);
    }
  }
  return false;
};

const filter = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated() && !isRouteWhiteListed(req)) {
    res.redirect(RouterUris.BASE + RouterUris.LOG_IN);
  } else {
    next();
  }
};

export default { filter };
