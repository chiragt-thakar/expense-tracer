const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  friend: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Friend = mongoose.model("friend", friendSchema, "friends");
module.exports = Friend;
