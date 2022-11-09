import { Router } from "express";
import passport from "passport";
import { RouterUris } from "../configs/RouterUri";
import AppUserController from "../controller/AppUserController";
import LogInController from "../controller/LogInController";
import SignUpController from "../controller/SignUpController";
import TopicController from "../controller/TopicController";
import TopicsAllController from "../controller/TopicsAllController";
import AppUserValidator from "../validation/AppUserValidator";

export const initRouter = (router: Router) => {
  router.get(
    RouterUris.BASE + RouterUris.USERS + RouterUris.PATHVAR_ID,
    AppUserController.getUserById
  );

  router.get(SignUpController.URI, SignUpController.getHandler);
  router.post(
    SignUpController.URI,
    SignUpController.validateReqBody,
    AppUserValidator.validationRules(),
    SignUpController.validationErrorHandler,
    SignUpController.postHandler,
    SignUpController.handleError
  );

  router.get(LogInController.URI, LogInController.getHandler);
  router.post(
    LogInController.URI,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: LogInController.URI,
      failureMessage: true,
    })
  );

  router.get(TopicsAllController.URI, TopicsAllController.getHandler);

  router.get(TopicController.URI, TopicController.getHandler);
};
