const jwt = require("jsonwebtoken");
const config = require("../../configs/config");
const Token = require("../models/tokens.model");
const User = require("../models/user.model");
const logger = require('../scripts/logger.js')

const generateToken = (type, userId) => {
  const a =
    type === "access"
      ? parseInt(config.accessExpireTime) * 60 * 60
      : `${config.refreshExpireTime}m`;
  console.log(typeof a, a);
  const token = jwt.sign(
    {
      type,
      userId,
    },
    config.jwtSecret,
    {
      expiresIn: `${
        type === "access"
          ? `${config.accessExpireTime}m`
          : `${config.refreshExpireTime}d`
      }`,
    }
  );
  console.log("token :>> ", token);
  return token;
};

const saveToken = async (tokenBody) => {
  return Token.create(tokenBody);
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwtSecret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.userId,
  });
  if (!tokenDoc) {
    logger("token").error(`verifyToken => Please authenticate to continue.`);
    throw new Error("Please authenticate to continue");
  }
  return tokenDoc;
};

const refreshTokenService = async (refreshToken) => {
  const tokenUser = Token.findOne({ refreshToken });
  const user = User.findById(tokenUser.userId, { password: 0 });
  console.log("tokenUser :>> ", tokenUser);
  console.log("user :>> ", user);
  const tokenDoc = await verifyToken(refreshToken, "refresh");
  const rfsToken = generateToken("refresh", tokenDoc.userId);
  const accessToken = generateToken("access", tokenDoc.userId);
  return {
    refreshToken:rfsToken,
    accessToken,
  };
};

module.exports = { generateToken, saveToken,refreshTokenService };
