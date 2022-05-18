const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const promiseUsers = testHelper.initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    return new User({
      username: user.username,
      name: user.name,
      passwordHash,
    });
  });
  const userObjects = await Promise.all(promiseUsers);
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
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
