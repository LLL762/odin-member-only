import * as dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";
import session from "express-session";
import path from "path";
import logger from "morgan";
import http from "http";
import { MongoDbDatasource } from "./datasource/MongoDbDatasource";
import { Topic } from "./model/Topic";
import { AppUser } from "./model/AppUser";
import { AppRole, appRoleProperties } from "./model/AppRole";
import { Message } from "./model/Message";
import { initRouter } from "./init/RouterInit";
import { handleError } from "./error/handler/GlobalErrorHandler";
import { isValidObjectId } from "mongoose";
import { handleMongooseError } from "./error/handler/MongooseErrHandler";

const app = express();
const router = express.Router();

app.use(express.json());

const secret = process.env.PASSPORT_SESSION_SECRET;
if (!secret) {
  throw new Error("A session secret is required");
}

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

const topic = new Topic();
const user = new AppUser();
const role = new AppRole();
const message = new Message();

const dataSource = new MongoDbDatasource();
dataSource.connect();

initRouter(router);
router.get("*", (req, res) => res.status(404).render("404"));

app.use(router);

app.use(handleError);

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT ?? 3000, () => console.log("run!"));
