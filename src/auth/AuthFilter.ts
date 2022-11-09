import { NextFunction, Request, Response } from "express";
import { RouterUris } from "../configs/RouterUri";
import TopicController from "../controller/TopicController";
import TopicsAllController from "../controller/TopicsAllController";

const regexify = (url: string) => "^" + url.replace(/\:\w+/, "\\w+") + "$";

const routeWhiteList: string[] = [
  regexify(RouterUris.BASE + RouterUris.LOG_IN),
  regexify(RouterUris.BASE + RouterUris.SIGN_UP),
  regexify(TopicsAllController.URI),
  regexify(TopicController.URI),
];

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
];

const isRouteWhiteListed = (req: Request) => {
  for (let route of whiteList) {
    if (req.url.match(route.url)) {
      return route.methods.includes(req.method);
    }
    return false;
  }
};

const matchOne = (url: string, regexs: string[]): boolean => {
  for (let regex of regexs) {
    if (url.match(regex)) {
      return true;
    }
  }
  return false;
};

const filter = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user && !isRouteWhiteListed(req)) {
    res.redirect(RouterUris.BASE + RouterUris.LOG_IN);
  } else {
    next();
  }
};

export default { filter, regexify };
