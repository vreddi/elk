import { Document } from "mongoose";

export interface IUserRequestPayload {
  userName: string;
  email: string;
  password: string;
}

/**
 * Mongoose model for User resource. This is the type returned
 * as part of the payload for User related APIs.
 */
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}