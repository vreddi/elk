import { Application } from 'express';
import CollectionService from 'services/collection';

export default class CollectionController {
  private _service: CollectionService;

  constructor(public app: Application) {
    this._service = new CollectionService();
    this.routes();
  }

  public routes() {
    this.app.route('/collections').get(this._service.getCollections);

    this.app.route('/collections').post(this._service.createCollection);

    this.app.route('/collections/:id').patch(this._service.patchCollection);

    this.app.route('/collections/:id').delete(this._service.deleteCollection);
  }
}
