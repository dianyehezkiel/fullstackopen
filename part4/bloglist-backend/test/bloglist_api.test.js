const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(testHelper.initialBlogs.length);
});

test('id property is defined', async () => {
  const blogs = await testHelper.blogsInDb();
  const firstBlog = blogs[0];

  expect(firstBlog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };

  await api
    .post('/api/blogs')
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
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const allBlogs = await testHelper.blogsInDb();
  const lastBlog = allBlogs[allBlogs.length - 1];

  expect(lastBlog.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
