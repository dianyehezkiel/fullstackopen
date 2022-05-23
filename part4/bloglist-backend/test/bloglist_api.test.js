const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);
const usersToken = [];
let userId = '';

beforeAll(async () => {
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
  const users = await Promise.all(promiseArray);

  userId = users[0]._id;

  for (let i = 0; i < users.length; i += 1) {
    const userForToken = {
      username: users[i].username,
      id: users[i]._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    usersToken.push(token);
  }
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = testHelper.initialBlogs.map((blog) => {
    const newBlog = {
      ...blog,
      user: userId,
    };
    return new Blog(newBlog);
  });
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('GET all blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(testHelper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain(
      'First class tests',
    );
  });

  test('id property is defined', async () => {
    const blogs = await testHelper.blogsInDb();
    const firstBlog = blogs[0];

    expect(firstBlog.id).toBeDefined();
  });
});

describe('POST blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      user: userId,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${usersToken[0]}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await testHelper.blogsInDb();
    expect(allBlogs).toHaveLength(testHelper.initialBlogs.length + 1);

    const titles = allBlogs.map((blog) => blog.title);
    expect(titles).toContain('Go To Statement Considered Harmful');
  });

  test('likes property default to zero if missing', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      user: userId,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${usersToken[0]}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await testHelper.blogsInDb();
    const newestBlog = allBlogs.find((blog) => blog.title === newBlog.title);

    expect(newestBlog.likes).toBe(0);
  });

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      user: userId,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${usersToken[0]}`)
      .send(newBlog)
      .expect(400);

    const allBlogs = await testHelper.blogsInDb();
    expect(allBlogs).toHaveLength(testHelper.initialBlogs.length);
  });

  test('blog without token is not added and get proper statuscode', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      user: userId,
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const allBlogs = await testHelper.blogsInDb();
    expect(allBlogs).toHaveLength(testHelper.initialBlogs.length);
  });
});

describe('UPDATE blog', () => {
  test('blog with valid id and user token is updated', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToUpdate = allBlogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${usersToken[0]}`)
      .send({ likes: 99 })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await testHelper.blogsInDb();
    const updatedBlog = finalBlogs.find((blog) => blog.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(99);
  });

  test('blog update without token responded with proper statuscode', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToUpdate = allBlogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 99 })
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await testHelper.blogsInDb();
    const notUpdatedBlog = finalBlogs.find((blog) => blog.id === blogToUpdate.id);

    expect(notUpdatedBlog.likes).toBe(blogToUpdate.likes);
  });
});

describe('DELETE blog', () => {
  test('blog with valid id is deleted', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToDelete = allBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${usersToken[0]}`)
      .expect(204);

    const finalBlogs = await testHelper.blogsInDb();

    expect(finalBlogs).toHaveLength(testHelper.initialBlogs.length - 1);

    const titles = finalBlogs.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('user that not create blog can not delete blog and responded with proper status code', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToDelete = allBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${usersToken[1]}`)
      .expect(403);

    const finalBlogs = await testHelper.blogsInDb();

    expect(finalBlogs).toHaveLength(testHelper.initialBlogs.length);
  });

  test('blog delete without token responded with proper statuscode', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToDelete = allBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await testHelper.blogsInDb();

    expect(finalBlogs).toHaveLength(testHelper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
