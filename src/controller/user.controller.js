const catchAsync = require("../../common/catchAsync");
const { addFriendService } = require("../services/user.service");
const { U6 } = require("../messages/user.message");
const response = require("../../common/response");

const addFriendController = catchAsync(async (req, res) => {
  const friend = await addFriendService(req);

  return res.send(response.success(U6, "U6", friend));
});

module.exports = { addFriendController };
