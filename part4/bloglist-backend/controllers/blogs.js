const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1, id: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(populatedBlog);
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { body, user } = request;
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({
      error: 'Can not find blog',
    });
  }

  if (blog.user.toString() === user._id.toString()) {
    const likes = {
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      likes,
      { new: true },
    ).populate('user', { username: 1, name: 1, id: 1 });

    return response.json(updatedBlog);
  }

  return response.status(403).end();
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({
      error: 'Can not find blog',
    });
  }

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
