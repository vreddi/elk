import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import App from '../../src/app';
import { User } from "../../src/models/user";

describe ('🧒 User', () => {
  let app: request.SuperTest<request.Test>;
  let validId: string;
  const validUserName = "test";
  const validEmail = 'test@test.com';
  const validPassword = 'testingtestingtestingtesting';

  beforeAll((done) => {
    app = request(App);

    // Create test user
    bcrypt.genSalt()
    .then(salt => bcrypt.hash(validPassword, salt))
    .then(hashedPassword => {
      const user = new User({
        userName: validUserName,
        email: validEmail,
        password: hashedPassword
      });

      return user.save().then(user => {
        validId = user.id;
      });
    })
    .finally(() => done());
  })

  it('can login valid user', (done) => {
    app
      .post('/user/login')
      .send({
        email: "test@test.com",
        password: "testingtestingtestingtesting"
      })
      .then(res => {
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("userName");
        expect(res.body).toHaveProperty("email");
        expect(res.body).not.toHaveProperty("password");

        expect(res.body.id).toBeDefined;
        expect(res.body.id).toBe(validId);
        expect(res.body.userName).toEqual(validUserName);
        expect(res.body.email).toEqual(validEmail);
      })
      .finally(() => done());
  });

  it('can deny access to invalid user', (done) => {
    app
      .post('/user/login')
      .send({
        email: "badUser@test.com",
        password: "restingrestingrestingresting"
      })
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("The email does not exist.");
      })
      .finally(() => done());
  });

  afterAll((done) => {
    app.removeAllListeners();
    mongoose.connection.close().finally(() => done());
  })
});
