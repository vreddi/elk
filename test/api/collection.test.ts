import request from 'supertest';
import mongoose from 'mongoose';
import App from '../../src/app';

describe('Test', () => {
  let app: request.SuperTest<request.Test>;
  beforeAll(() => {
    app = request(App);
  })

  it('GET /collections', (done) => {
    app
      .get('/collections')
      .send()
      .then(res => {
        const body = res.body;

        expect(body).toStrictEqual([]);
      })
      .finally(() => done())
  });

  it('POST /collection', (done) => {
    app
      .post('/collection')
      .send({ name: "Football" })
      .then(res => {
        const body = res.body;

        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("version");
        expect(body).toHaveProperty("_id");
        expect(body).toHaveProperty("createDate");
        expect(body).toHaveProperty("lastUpdated");
      })
      .finally(() => done())
  });

  afterAll((done) => {
    app.removeAllListeners();
    mongoose.connection.close().finally(() => done());
  })
});
