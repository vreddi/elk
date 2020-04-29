
import { Application, Router } from 'express';
import UserService from "services/user";
import { BaseController } from './base';

export default class UserController extends BaseController {
  private _service: UserService;

  constructor(app: Application) {
    super(app, Router());

    this._service = new UserService();
    this.routes();
  }

  public routes() {
    this.app.route('/user/signup').post(this._service.createUser);

    this.app.route('/user/:id').delete(this._service.deleteUser);

    this.app.route('/user/login').post(this._service.login);
  }
}
