import { model, Schema, Types } from "mongoose";
import { ValidationUtility as v } from "../validation/ValidationUtility";

export interface IAppRole {
  _id: Types.ObjectId;
  name: string;
  accessLevel: number;
}

export enum RolesNames {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export const appRoleProperties = Object.freeze({
  defaultMaxLength: 255,
  defaultMinLength: 2,
  accessLevelMax: 100,
  accessLevelMin: 0,
  accesLevelDefault: 0,
});

const appRoleSchema = new Schema<IAppRole>(
  {
    name: {
      type: String,
      required: [true, v.createRequiredMsg("name")],
      trim: true,
      maxlength: [
        appRoleProperties.defaultMaxLength,
        v.createMaxLengthMsg("name", appRoleProperties.defaultMaxLength),
      ],
      minlength: [
        appRoleProperties.defaultMinLength,
        v.createMinLengthMsg("name", appRoleProperties.defaultMinLength),
      ],
      unique: true,
    },
    accessLevel: {
      type: Number,
      default: appRoleProperties.accesLevelDefault,
      min: [
        appRoleProperties.accessLevelMin,
        v.createMinMsg("accessLevel", appRoleProperties.accessLevelMin),
      ],
      max: [
        appRoleProperties.accessLevelMax,
        v.createMaxMsg("accessLevel", appRoleProperties.accessLevelMax),
      ],
    },
  },
  { collection: "appRoles" }
);

export const AppRole = Object.seal(model<IAppRole>("AppRole", appRoleSchema));
