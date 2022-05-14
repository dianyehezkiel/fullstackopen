const maxBy = require('lodash/maxBy');
const countBy = require('lodash/countBy');
const groupBy = require('lodash/groupBy');
const mapValues = require('lodash/mapValues');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (prev, curr) => prev + curr.likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const mostLikesBlog = {
    title: '',
    author: '',
    likes: -1,
  };

  blogs.forEach((blog) => {
    if (blog.likes > mostLikesBlog.likes) {
      mostLikesBlog.title = blog.title;
      mostLikesBlog.author = blog.author;
      mostLikesBlog.likes = blog.likes;
    }
  });

  return mostLikesBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const countBlogsByAuthor = countBy(blogs, 'author');

  const authorblogs = [];

  Object.keys(countBlogsByAuthor)
    .forEach((author, index) => {
      authorblogs[index] = {
        author,
        blogs: countBlogsByAuthor[author],
      };
    });

  return maxBy(authorblogs, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const likesCounter = (groupedBlogs) => {
    const reducer = (prev, curr) => prev + curr.likes;

    return Object.values(groupedBlogs)
      .reduce(reducer, 0);
  };

  const countLikesByAuthor = mapValues(groupBy(blogs, 'author'), likesCounter);

  const authorblogs = [];

  Object.keys(countLikesByAuthor)
    .forEach((author, index) => {
      authorblogs[index] = {
        author,
        likes: countLikesByAuthor[author],
      };
    });

  return maxBy(authorblogs, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
