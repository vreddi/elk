import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import CollectionController from 'controllers/collection';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

class App {
  public app: Application;
  private _collectionController: CollectionController;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongooseConfig();

    this._collectionController = new CollectionController(this.app);
  }

  private setMongooseConfig() {
    let uri: Promise<string | undefined> = Promise.resolve(process.env.MONGO_URI);
    let user: string | undefined = process.env.MONGO_USER;
    let pass: string | undefined = process.env.MONGO_PASS;

    mongoose.Promise = global.Promise;

    if (process.env.NODE_ENV === 'test') {
      const mongod = new MongoMemoryServer();

      uri = mongod.getUri();
      user = undefined;
      pass = undefined;
    }

    uri.then(uris => {
      mongoose.connect(uris as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user,
        pass,
      });
    });
  }

  private setConfig() {
    // Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended:true}));

    // Enables cors
    this.app.use(cors());
  }
}

export default new App().app;
