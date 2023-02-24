const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a single thought by its _id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new thought and push the thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        // if no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'Thought updated successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // remove a thought by its _id
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        // remove the thought _id from the associated user's thoughts array field
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json({ message: 'Thought deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    // add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            
            .then((dbThoughtData) => {
                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    },

    // remove a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            
            .then((dbThoughtData) => {

                // if no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            }
            );
    }
};

module.exports = thoughtController;

// Path: controllers\userController.js
// Compare this snippet from controllers\userController.js:
// const User = require('../models/User');
// to this snippet from controllers\thoughtController.js:
// const { Thought, User } = require('../models');


const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = userController;