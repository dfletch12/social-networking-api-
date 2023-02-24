const { connect, connection } = require('mongoose');

connect('mongodb://localhost/usersandthoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
