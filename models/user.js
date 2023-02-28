const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

// virtual to get the number of friends for a user
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const user = mongoose.model('User', UserSchema);

module.exports = user;
