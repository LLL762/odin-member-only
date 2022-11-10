const regexify = (url: string) => "^" + url.replace(/\:\w+/, "\\w+") + "$";

const isRouteWhiteListed = (req: Request, whiteList: any) => {
  for (let route of whiteList) {
    if (req.url.match(route.url)) {
      return route.methods.includes(req.method);
    }
  }
  return false;
};
