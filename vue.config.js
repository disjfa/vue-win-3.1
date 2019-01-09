module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-win-3.1' // prod
    : '/', // dev
};
