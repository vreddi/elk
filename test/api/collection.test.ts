import request from 'supertest';
import mongoose from 'mongoose';
import App from '../../src/app';

describe.only('📁 Collection', () => {
  let app: request.SuperTest<request.Test>;
  let authToken: string;

  beforeAll((done) => {
    app = request(App);

    // Create test account
    app
      .post('user/signup')
      .send({
        userName: 'test',
        email: 'test@test.com',
        password: 'testingtestingtesting@testing'
      })
      .then(() => (
        app
          .post('user/login')
          .send({
            email: 'test@test.com',
            password: 'testingtestingtesting@testing'
          })
      ))
      .then(res => {
        authToken = res.header['Authorization'];
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => done());
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
      .set('Authorization', authToken)
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
  });
});
