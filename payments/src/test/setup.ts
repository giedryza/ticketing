import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin: (id?: string) => string[];
    }
  }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_ovxhnYj3TAlhqk4IIYvOPl4f';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'secret';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // turn that session into JSON
  const sessiojJSON = JSON.stringify(session);

  // take json and encode it as base64
  const base64 = Buffer.from(sessiojJSON).toString('base64');

  // return string that is the cookie with encoded data
  return [`express:sess=${base64}`];
};
