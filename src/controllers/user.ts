
import { Application, Router } from 'express';
import UserService from "services/user";
import { BaseController } from './base';
import { verifyToken } from 'services/token';

export default class UserController extends BaseController {
  private _service: UserService;

  constructor(app: Application) {
    super(app, Router());

    this._service = new UserService();
    this.routes();
  }

  public routes() {
    this.router.post("/user/signup", this._service.createUser);

    this.router.delete("/user/:id", verifyToken, this._service.deleteUser);

    this.router.post("/user/:id/token", verifyToken, )

    this.app.route("/user/login").post(this._service.login);
  }
}
