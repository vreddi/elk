import mongoose from "mongoose";

export interface IUserSchema {
  userName: string;
  email: string;
  password: string;
}

export interface IUser extends IUserSchema, mongoose.Document {
  createDate?: string;
  lastUpdated?: string;
  version?: string;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
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
