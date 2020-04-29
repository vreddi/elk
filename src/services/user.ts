import { User } from "models/user";
import BaseService from "./base";
import { Request, Response } from "express";
import { DocumentQuery } from "mongoose";
import { ValidateSignup, ValidateLogin } from "validations/user.validations";
import { IUser } from "types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Creates a new user that can make calls to the service.
   */
  public createUser = async (req: Request, res: Response) => {
    // Check for basic user property validations
    const { error } = ValidateSignup(req.body);

    if (error) {
      return res.status(400).send(this.getErrorResponse(error.details[0].message));
    }

    // Check if the user already exists in the DB
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).send(this.getErrorResponse("Email already exists."));
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    });

    return await user.save((error, document) => {
      if (error) {
        res.status(400).send(error);
      }

      res.json({
        id: document._id,
        userName: document.userName,
        email: document.email
      });
    });
  }

  /**
   * Logs-in a valid user so that the user can access the service.
   */
  public login = async (req: Request<any, any, { email: string, password: string}>, res: Response) => {
    // Check for basic user property validations
    const { error } = ValidateLogin(req.body);

    if (error) {
      return res.status(400).send(this.getErrorResponse(error.details[0].message));
    }

    // Check if the user email exists
    const user: IUser | null = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send(this.getErrorResponse("The email does not exist."));
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).send(this.getErrorResponse("The password is incorrect."));
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        email: user.email
      },
      process.env.TOKEN_SECRET as string
    );

    res.header("auth-token", token).send(token);

    res.send({
      id: user._id,
      userName: user.userName,
      email: user.email
    });
  }

  public deleteUser = async (req: Request, res: Response) => {
    return await User.findByIdAndDelete(req.params.id, this.handleDBDeleteResponse(res))
  }
}
