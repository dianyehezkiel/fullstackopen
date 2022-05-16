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

afterAll(() => {
  mongoose.connection.close();
});
