const port = process.env.PORT || 4000;
const env  = process.env.NODE_ENV || 'development';
const db   = {
  production: process.env.MONGODB_URI,
  development: 'mongodb://localhost/wdi-group-project-development',
  test: 'mongodb://localhost/wdi-group-project-test'
};
const secret = process.env.SECRET || 'shh';

module.exports = { port, env, db, secret};
// db: {
//   production: process.env.MONGODB_URI,
//   development: 'mongodb://localhost/wdi-group-project-development',
//   test: 'mongodb://localhost/wdi-group-project-test'
// }
