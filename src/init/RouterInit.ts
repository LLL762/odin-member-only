import { Router } from "express";
import { RouterUris } from "../configs/RouterUri";
import AppUserController from "../controller/AppUserController";

export const initRouter = (router: Router) => {
  router.get(
    RouterUris.BASE + RouterUris.USERS + RouterUris.PATHVAR_ID,
    AppUserController.getUserById
  );
};
