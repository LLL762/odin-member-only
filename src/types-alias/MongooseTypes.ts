import { Callback, Document, ObjectId, Types } from "mongoose";

export type QueryResult<T> =
  | (Document<unknown, any, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;

export type Doc<T> = Document<unknown, any, T> &
  T & {
    _id: Types.ObjectId;
  };

export type QueryBody<T> =
  | Callback<(Document<unknown, any, T> & T & { _id: ObjectId })[]>
  | undefined;
