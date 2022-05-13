// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (prev, curr) => prev + curr.likes;

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
