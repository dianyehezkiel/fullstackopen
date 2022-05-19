const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid ' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true },
  );

  response.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({
      error: 'Can not find blog',
    });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid ',
    });
  }

  const user = await User.findById(decodedToken.id);

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    user.blogs = user.blogs
      .filter((blogId) => blogId.toString() !== blog._id.toString());
    await user.save();
    return response.status(204).end();
  }

  return response.status(403).end();
});

module.exports = blogsRouter;
