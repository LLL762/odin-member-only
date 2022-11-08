import { Router } from "express";
import { RouterUris } from "../configs/RouterUri";
import AppUserController from "../controller/AppUserController";
import SignUpController from "../controller/SignUpController";
import AppUserValidator from "../validation/AppUserValidator";

export const initRouter = (router: Router) => {
  router.get(
    RouterUris.BASE + RouterUris.USERS + RouterUris.PATHVAR_ID,
    AppUserController.getUserById
  );

  router.get(SignUpController.URI, SignUpController.getHandler);
  router.post(
    SignUpController.URI,
    AppUserValidator.validationRules(),
    SignUpController.validationErrorHandler,
    SignUpController.postHandler,
    SignUpController.handleError
  );
};
