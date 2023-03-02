const { user, thought } = require('../models');

const userController = {
  getAllUsers(req, res) {
    user.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    user.findOne({ _id: req.params.id})
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    user.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    user.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        return thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
        res.json("User and thoughts deleted.");
      })
      .catch((err) => res.status(500).json(err));
  },

//   
addFriend({ params }, res) {
  user.findOneAndUpdate(
    { _id: params.userId },
    { $addToSet: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user with this ID!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},

removeFriend({ params }, res) {
  user.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this ID!" });
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
},
};

module.exports = userController;
