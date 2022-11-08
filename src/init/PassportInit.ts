import passport from "passport";
import PassportConfigs from "../auth/PassportConfigs";

const init = () => {
  passport.use(PassportConfigs.STRATEGY);
  passport.serializeUser(PassportConfigs.serializeAppUser);
  passport.deserializeUser(PassportConfigs.deserializeAppUser);
};

export default { init };
