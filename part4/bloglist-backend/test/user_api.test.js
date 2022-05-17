const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(testHelper.initialUsers);
});

describe('GET users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all users are returned', async () => {
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(testHelper.initialUsers.length);
  });

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users');

    const username = response.body.map((r) => r.username);

    expect(username).toContain(
      'root',
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
