import { model, Schema, Types } from "mongoose";
import { IMesssage } from "./Message";
import v from "../validation/ValidationUtility";

export interface ITopic {
  _id: Types.ObjectId;
  name: string;
  messages: IMesssage[];
  lastPost: Date;
}

export const topicProperties = Object.freeze({
  defaultMaxLength: 255,
  defaultMinLength: 2,
});

const topicSchema = new Schema<ITopic>(
  {
    name: {
      type: String,
      required: [true, v.createRequiredMsg("name")],
      trim: true,
      maxlength: [
        topicProperties.defaultMaxLength,
        v.createMaxLengthMsg("name", topicProperties.defaultMaxLength),
      ],
      minlength: [
        topicProperties.defaultMinLength,
        v.createMinLengthMsg("name", topicProperties.defaultMinLength),
      ],
      unique: true,
    },
    messages: {
      type: [{ type: Types.ObjectId, ref: "Message" }],
    },
    lastPost: {
      type: Date,
      required: [true, v.createRequiredMsg("lastPost")],
    },
  },
  { collection: "topics", timestamps: true }
);

export const Topic = Object.seal(model<ITopic>("Topic", topicSchema));
