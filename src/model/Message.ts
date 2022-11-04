import { model, Schema, Types } from "mongoose";
import { IAppUser } from "./AppUser";
import { ValidationUtility as v } from "../validation/ValidationUtility";
import { ITopic } from "./Topic";
export interface IMesssage {
  _id: Types.ObjectId;
  title: string;
  content: string;
  children: IMesssage[];
  parent: IMesssage;
  author: IAppUser;
  topic: ITopic;
}
export const messageProperties = Object.freeze({
  defaultMaxLength: 255,
  defaultMinLength: 2,
  titleMinlength: 5,
  contentMaxLength: 5000,
  contentMinLength: 1,
  maxChildrenLength: 10,
});

const messageSchema = new Schema<IMesssage>(
  {
    title: {
      type: String,
      required: [true, v.createRequiredMsg("title")],
      trim: true,
      maxlength: [
        messageProperties.defaultMaxLength,
        v.createMaxLengthMsg("title", messageProperties.defaultMaxLength),
      ],
      minlength: [
        messageProperties.titleMinlength,
        v.createMinLengthMsg("title", messageProperties.titleMinlength),
      ],
    },
    content: {
      type: String,
      required: [true, v.createRequiredMsg("content")],
      maxlength: [
        messageProperties.contentMaxLength,
        v.createMaxLengthMsg("content", messageProperties.contentMaxLength),
      ],
      minlength: [
        messageProperties.contentMinLength,
        v.createMaxLengthMsg("content", messageProperties.contentMinLength),
      ],
    },
    children: {
      type: [{ type: Types.ObjectId, ref: "Message" }],
      validate: [
        (children: IMesssage[]) =>
          children.length <= messageProperties.maxChildrenLength,
        v.createTooManyElemMsg("children", messageProperties.maxChildrenLength),
      ],
    },
    parent: {
      type: Types.ObjectId,
      ref: "Message",
    },
    author: {
      type: Types.ObjectId,
      ref: "AppUser",
      required: [true, v.createRequiredMsg("author")],
    },
    topic: {
      type: Types.ObjectId,
      ref: "Topic",
      required: [true, v.createRequiredMsg("topic")],
    },
  },
  { collection: "messages", timestamps: true }
);

messageSchema.pre("validate", function (next) {
  if (this.parent && this.children) {
    next(new Error("An already nested message cannot have childs"));
  }
  next();
});

export const Message = Object.seal(model<IMesssage>("Message", messageSchema));
