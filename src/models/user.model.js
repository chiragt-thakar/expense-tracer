const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const md5 = require("md5");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = md5(this.password);
  }
  next();
});

const User = mongoose.model("user", userSchema, "users");
module.exports = User;
