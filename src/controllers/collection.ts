import { Application } from 'express';
import CollectionService from 'services/collection';

export default class CollectionController {
  private _service: CollectionService;

  constructor(private app: Application) {
    this._service = new CollectionService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this._service.getCollections);

    this.app.route('/collections').get(this._service.getCollections);

    this.app.route('/collection').post(this._service.createCollection);

    this.app.route('/collection/:id').patch(this._service.patchCollection);

    this.app.route('/collection/:id').delete(this._service.deleteCollection);
  }
}
