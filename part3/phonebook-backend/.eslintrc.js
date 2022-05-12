module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'consistent-return': 0,
  },
};
