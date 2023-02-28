// Import express router and controllers
const mongoose = require("mongoose");
const router = require("express").Router();

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// module.exports = mongoose.connection;
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getSingleUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:userId/friends/:friendId', addFriend);
router.delete('/users/:userId/friends/:friendId', removeFriend);

// Thought routes
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', removeThought);
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
