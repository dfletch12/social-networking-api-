// Import express router and controllers
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../controllers/user-controller');
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  createReaction,
  deleteReaction,
} = require('../controllers/thought-controller');

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);
router.post('/users/:userId/friends/:friendId', addFriend);
router.delete('/users/:userId/friends/:friendId', removeFriend);

// Thought routes
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:id', updateThoughtById);
router.delete('/thoughts/:id', deleteThoughtById);
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
