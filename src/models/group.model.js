const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Group = mongoose.model("group", groupSchema, "groups");
module.exports = Group;
