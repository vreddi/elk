import { Application, Router } from 'express';
import CollectionService from 'services/collection';
import { verifyToken } from 'services/token';
import { BaseController } from './base';

export default class CollectionController extends BaseController {
  private _service: CollectionService;

  constructor(app: Application) {
    super(app, Router());

    this._service = new CollectionService();
    this.routes();
  }

  public routes() {
    this.router.get("/collections", verifyToken, this._service.getCollections);

    this.router.post('/collection', verifyToken, this._service.createCollection);

    this.router.patch('/collection/:id', verifyToken, this._service.patchCollection);

    this.router.delete('/collection/:id', verifyToken, this._service.deleteCollection);
  }
}
