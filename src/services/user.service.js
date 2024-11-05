const User = require("../models/user.model");
const Friend = require("../models/friend.model.js");
const { default: mongoose } = require("mongoose");
const ApiError = require("../../common/apiError.js");
const { U7 } = require("../messages/user.message.js");
const httpStatus = require("http-status");

const getUserByEmail = async (email) => {
  return User.findOne({ email, isDeleted: false }).select("+password");
};
const addFriendService = async (req) => {
  const user = req.user._id;
    const friend = req.body.user;
    console.log(user,friend)
  if (user.toString() == friend) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, U7, "U7");
  }
  return Friend.create({
    user: user,
    friend: friend,
  });
};

module.exports = { getUserByEmail, addFriendService };
