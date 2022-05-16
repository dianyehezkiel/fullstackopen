const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
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
    const newestBlog = allBlogs.find((blog) => blog.title === newBlog.title);

    expect(newestBlog.likes).toBe(0);
  });

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const allBlogs = await testHelper.blogsInDb();
    expect(allBlogs).toHaveLength(testHelper.initialBlogs.length);
  });
});

describe('UPDATE blog', () => {
  test('blog with valid id is updated', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const firstBlog = allBlogs[0];

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send({ likes: 99 })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await testHelper.blogsInDb();
    const updatedBlog = finalBlogs.find((blog) => blog.id === firstBlog.id);

    expect(updatedBlog.likes).toBe(99);
  });
});

describe('DELETE blog', () => {
  test('blog with valid id is deleted', async () => {
    const allBlogs = await testHelper.blogsInDb();
    const blogToDelete = allBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const finalBlogs = await testHelper.blogsInDb();

    expect(finalBlogs).toHaveLength(testHelper.initialBlogs.length - 1);

    const titles = finalBlogs.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
