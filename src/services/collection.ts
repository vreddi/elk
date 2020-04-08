import { Request, Response } from "express";
import { Collection } from "models/collection";
import BaseService from "./base";

export default class CollectionService extends BaseService {
  constructor() {
    super();
  }

  public getCollections = (req: Request, res: Response) => {
    Collection.find({}, this.handleDBResponse(res));
  }

  public createCollection = (req: Request, res: Response)  =>{
    const collection = new Collection(req.body);

    collection.save(this.handleDBResponse(res));
  }

  public patchCollection = (req: Request, res: Response) => {
    const collectionId = req.params.id;

    Collection.findByIdAndUpdate(collectionId, {...req.body}, this.handleDBDeleteResponse(res))
  }

  public deleteCollection = (req: Request, res: Response) => {
    Collection.findByIdAndDelete(req.params.id, this.handleDBDeleteResponse(res))
  }
}
