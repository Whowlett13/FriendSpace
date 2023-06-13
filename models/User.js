const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: "username is required",
  },

  email: {
    type: String,
    unique: true,
    required: "username is required",
    match: [/.+@.+\..+/],
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: {
    virtuals: true,
  },
  id: false,
});
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
