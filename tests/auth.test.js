import { mockResponse, mockRequest } from '../utils/mocks';
import { login, register } from '../controllers/auth.controller';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.model';
import { MongoMemoryServer } from 'mongodb-memory-server';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

let connection;

beforeAll(async done => {
  connection = new MongoMemoryServer();
  const mongoUri = await connection.getConnectionString();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  done();
  await User.create({
    username: 'Danex2',
    password: bcrypt.hashSync('password', 8),
    contactInfo: {
      phone: '123-456-7890'
    }
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await connection.stop();
});

describe('Testing the authentication routes', () => {
  describe('Testing the login route', () => {
    test('Login should return a 400 status code if the username or password is missing', async done => {
      const req = mockRequest({ username: 'danex2' });
      const res = mockResponse();
      await login(req, res);
      done();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing username or password.'
      });
    });
    test('Login should return a 400 status code if the passwords do not match', async done => {
      const req = mockRequest({ username: 'Danex2', password: 'passwor' });
      const res = mockResponse();
      await login(req, res);
      done();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid username or password.'
      });
    });
    test('Login should return a 400 status code if no user is found', async done => {
      const req = mockRequest({
        username: 'someusernamethatdoesnotexist',
        password: 'somepassword'
      });
      const res = mockResponse();
      await login(req, res);
      done();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No one with that username exists.'
      });
    });
    test('Login should return a 200 status code for a successful login', async done => {
      const req = mockRequest({ username: 'Danex2', password: 'password' });
      const res = mockResponse();
      await login(req, res);
      done();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
