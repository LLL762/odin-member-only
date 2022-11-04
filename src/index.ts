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
import { ValidationUtility } from "./validation/ValidationUtility";
import { Topic } from "./model/Topic";
import { AppUser } from "./model/AppUser";
import { AppRole } from "./model/AppRole";
import { Message } from "./model/Message";

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

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT ?? 3000, () => console.log("run!"));

console.log(ValidationUtility.isPasswordStrong("a"));
