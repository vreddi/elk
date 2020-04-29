import { User, IUser, IUserSchema } from "models/user";
import BaseService from "./base";
import { Request, Response } from "express";

interface IUserRequestPayload {
  userName: string;
  email: string;
  password: string;
}

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  public createUser = async (req: Request, res: Response): Promise<IUser> => {
    const user = new User({
      userName: (req.body as IUserRequestPayload).userName,
      email: (req.body as IUserRequestPayload).email,
      password: (req.body as IUserRequestPayload).password
    });

    return await user.save(this.handleDBResponse(res));
  }
}
