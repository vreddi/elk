import mongoose from "mongoose";
import { IUser } from "types/user";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  }
},
{
  timestamps: {
    createdAt: 'createDate',
    updatedAt: 'lastUpdated',
  },
  versionKey: 'version',
});

export const User = mongoose.model<IUser>("User", UserSchema);
