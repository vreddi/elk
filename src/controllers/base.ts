import { Application, Router } from "express";

export class BaseController {
  constructor(public app: Application, public router: Router) {
    app.use("/api", router);
  }
}