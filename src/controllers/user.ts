
import { Application } from 'express';
import UserService from "services/user";

export default class UserController {
  private _service: UserService;

  constructor(public app: Application) {
    this._service = new UserService();
    this.routes();
  }

  public routes() {
    this.app.route('/user/signup').post(this._service.createUser);
  }
}
