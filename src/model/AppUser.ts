import { model, Schema, Types } from "mongoose";
import validator from "validator";
import v from "../validation/ValidationUtility";
import { IAppRole } from "./AppRole";
import bcrypt from "bcryptjs";
import { handleMongooseError } from "../error/handler/MongooseErrHandler";

export interface IAppUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string;
  roles: IAppRole[];
}

export const appUserProperties = Object.freeze({
  defaultMaxLength: 255,
  defaultMinLength: 2,
});

const appUserSchema = new Schema<IAppUser>(
  {
    username: {
      type: String,
      required: [true, v.createRequiredMsg("username")],
      trim: true,
      maxlength: [
        appUserProperties.defaultMaxLength,
        v.createMaxLengthMsg("username", appUserProperties.defaultMaxLength),
      ],
      minlength: [
        appUserProperties.defaultMinLength,
        v.createMinLengthMsg("username", appUserProperties.defaultMinLength),
      ],
      validate: {
        validator: v.doesNotContainBlackListChars,
        message: () => "username: " + v.getContainsBlackListCharsMsg(),
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, v.createRequiredMsg("password")],
      maxlength: [
        appUserProperties.defaultMaxLength,
        v.createMaxLengthMsg("password", appUserProperties.defaultMaxLength),
      ],
      validate: {
        validator: v.isPasswordStrong,
        message: () => "password: " + v.getWeakPasswordMsg(),
      },
    },
    email: {
      type: String,
      required: [true, v.createRequiredMsg("email")],
      trim: true,
      maxlength: [
        appUserProperties.defaultMaxLength,
        v.createMaxLengthMsg("email", appUserProperties.defaultMaxLength),
      ],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: () => v.getInvalidEmailMsg(),
      },
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      maxlength: [
        appUserProperties.defaultMaxLength,
        v.createMaxLengthMsg("firstname", appUserProperties.defaultMaxLength),
      ],
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: [
        appUserProperties.defaultMaxLength,
        v.createMaxLengthMsg("lastname", appUserProperties.defaultMaxLength),
      ],
    },
    roles: {
      type: [{ type: Types.ObjectId, ref: "AppRole" }],
    },
  },
  { collection: "appUsers", timestamps: true }
);

appUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }

  next();
});

export const AppUser = Object.seal(model<IAppUser>("AppUser", appUserSchema));
