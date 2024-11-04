const md5 = require("md5");
const User = require("../models/user.model");
const { generateToken, saveToken, refreshTokenService } = require("./token.service");
const { getUserByEmail } = require("./user.service");
const Token = require("../models/tokens.model");
const registerService = async (body) => {
  const user = await User.create(body);

  const accessToken = generateToken("access", user._id);
  const refreshToken = generateToken("refresh", user._id);
  const tokens = await saveToken({
    userId: user._id,
    type: "refresh",
    token: refreshToken,
  });
  console.log("user :>> ", user);
  console.log("tokens :>> ", tokens);
  return {
    user,
    tokens: { accessToken, refreshToken },
  };
};
const loginService = async (body) => {
  const user = await getUserByEmail(body.email);
  const accessToken = generateToken("access", user._id);
  const refreshToken = generateToken("refresh", user._id);
  const tokens = await saveToken({
    userId: user._id,
    type: "refresh",
    token: refreshToken,
  });
  console.log("user :>> ", user);
  console.log("tokens :>> ", tokens);
  return {
    user,
    tokens: { accessToken, refreshToken },
  };
};
const logoutService = async (refreshToken) => {
  const tokenDoc = await Token.findOne({
    token: refreshToken,
    type: "refresh",
 
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Please authenticate to continue");
  }
  await tokenDoc.remove();
};


module.exports = {
  registerService,
  loginService,
  logoutService,
  };
