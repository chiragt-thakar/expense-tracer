const ApiError = require("../../common/apiError.js");
const catchAsync = require("../../common/catchAsync.js");
const {
  registerService,
  logoutService,
  loginService,
} = require("../services/auth.service.js");
const User = require("../models/user.model.js");
const { A01, A02 } = require("../messages/auth.message.js");
const response = require("../../common/response.js");
const { U3, U4, U5 } = require("../messages/user.message.js");
const httpStatus = require("http-status");
const { refreshTokenService } = require("../services/token.service.js");

const registerController = catchAsync(async (req, res, next) => {
  console.log("req.body :>> ", req.body);

  const isEmail = await User.findOne({
    email: req.body.email,
    isDeleted: false,
  });
  if (isEmail) {
    throw new ApiError("A01", A01);
  }
  const user = await registerService(req.body);
  res.status(200).send(response.success(A02, "A02", user));
});

const loginController = catchAsync(async (req, res) => {
  const user = await loginService(req.body);
  return res.status(httpStatus.OK).send(response.success(U4, "U4", user));
});

const logoutController = catchAsync(async (req, res) => {
  await logoutService(req.body.refreshToken);
  return res.status(httpStatus.OK).send(response.success(U3, "U3", {}));
});
const refreshTokenController = async (req,res) => {
  const tokens = await refreshTokenService(req.body.refreshToken);
  return res.status(httpStatus.OK).send(response.success(U5, "U5", tokens));
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
};
