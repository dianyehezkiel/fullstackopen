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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
