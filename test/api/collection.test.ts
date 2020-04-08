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

  it('POST /collections', (done) => {
    app
      .post('/collections')
      .send({ name: 'Football' })
      .then(res => {
        const body = res.body;

        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('videos');
        expect(body).toHaveProperty('version');
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('createDate');
        expect(body).toHaveProperty('lastUpdated');

        expect(body['name' as string]).toEqual('Football')
      })
      .finally(() => done())
  });

  it('DELETE /collections', (done) => {
    let collectionToDelete: string;

    app
      .post('/collections')
      .send({ name: 'Basketball' })
      .then(res => {
        collectionToDelete = res.body['_id' as string];
      })
      .then(() => {
        return app
          .get('/collections')
          .send()
          .then(res => {
            const body = res.body;

            expect(body).toHaveLength(2);
          })
      })
      .then(() => {
        return app
        .delete(`/collections/${collectionToDelete}`)
        .send()
      })
      .then(res => {
        return app
          .get('/collections')
          .send()
          .then(innerRes => {
            const body = res.body;

            expect(body).toHaveLength(1);
          })
      })
      .finally(() => done())
  });

  afterAll((done) => {
    app.removeAllListeners();
    mongoose.connection.close().finally(() => done());
  })
});
