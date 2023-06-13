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

  thoughts: {},
});
