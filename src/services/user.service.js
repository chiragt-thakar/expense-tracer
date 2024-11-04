const User = require("../models/user.model");

const getUserByEmail = async (email) => {
    return User.findOne({ email, isDeleted: false }).select('+password');
};
  
module.exports = {getUserByEmail}