import { MongooseDocument } from "mongoose";
import { Response } from "express";

export default class BaseService {
  public handleDBResponse(res: Response) {
    return (error: Error, collectionDoc: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(collectionDoc);
    }
  }

  public handleDBDeleteResponse(res: Response) {
    return (error: Error, deleteDoc: any) => {
      if (error) {
        res.send(error);
      } else if (deleteDoc) {
        res.send('Deletion successful');
      } else {
        res.status(404).send('Not Found');
      }
    }
  }
}
