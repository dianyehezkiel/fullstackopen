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

describe('POST user', () => {
  test('succeds with valid data', async () => {
    const newUser = {
      username: 'bob',
      name: 'Bob',
      password: 'b0b',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(testHelper.initialUsers.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Super Root',
      password: 'superpassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('username must be unique');
    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails with proper statuscode and message if no username given', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: '',
      name: 'Sample',
      password: 'samplepassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'User validation failed: username: Path `username` is required.',
    );
    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails with proper statuscode and message if username shorter than 3 characters', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'as',
      name: 'Sample',
      password: 'samplepassword',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3).',
    );
    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails with proper statuscode and message if no password given', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'sample',
      name: 'Sample',
      password: '',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('password must be provided!');
    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('fails with proper statuscode and message if password is shorter than 3 characters', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'sample',
      name: 'Sample',
      password: 'as',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('password must be at least 3 characters long');
    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
