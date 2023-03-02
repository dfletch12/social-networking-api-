// const { thought } = require('../models/thought');
// const { user } = require('../models/user');
const { user, thought } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    thought.find({})
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a single thought by its _id
  getThoughtById(req, res) {
    thought.findOne({ _id: req.params.id })
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

  // create a new thought and push the thought's id to the associated user's thoughts

  createThought({ params, body }, res) {
    thought.create(body)
      .then(({ _id }) => {
        return user.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this ID!" });
        }

        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => res.json(err));
  },
  
  // createThought(req, res) {
  //   thought.create(req.body)
  //     .then(({ id }) => {
  //       return user.findOneAndUpdate(
  //         { _id: req.body.id },
  //         { $push: { thoughts: id } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       // if no user is found, send 404
  //       if (!dbUserData) {
  //         res.status(404).json({ message: 'No user found with this id!' });
  //         return;
  //       }
  //       res.json({ message: 'thought created successfully!' });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },

  // update a thought by its _id
  updateThought(req, res) {
    thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'thought updated successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // remove a thought by its _id
  removeThought(req, res) {
    thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        // remove the thought _id from the associated user's thoughts array field
        return user.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json({ message: 'thought deleted successfully!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    // add a reaction to a thought
    createReaction(req, res) {
        thought.findOneAndUpdate(
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
    deleteReaction(req, res) {
        thought.findOneAndUpdate(
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
// const user = require('../models/user');
// to this snippet from controllers\thoughtController.js:
// const { thought, user } = require('../models');


// const userController = {
//     // get all users
//     getAllUsers(req, res) {
//         user.find({})
//             .populate({
//                 path: 'thoughts',
//                 select: '-__v'
//             })
//             .populate({
//                 path: 'friends',
//                 select: '-__v'
//             })
//             .select('-__v')
//             .sort({ _id: -1 })
//             .then((dbUserData) => res.json(dbUserData))
//             .catch((err) => {
//                 console.log(err);
//                 res.status(400).json(err);
//             });
//     }
// };

// module.exports = userController;
