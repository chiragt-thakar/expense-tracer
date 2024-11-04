const httpStatus = require("http-status");
const passport = require("passport");
const ApiError = require("../../common/apiError");
const { U1, U2 } = require("../messages/user.message");
const logger = require("../scripts/logger.js")
const verifyCallback =
  (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
      logger("auth").error(
        `verifyCallback => Error - ${err}, ----- Info - ${info}`
      );
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;
    resolve();
  };

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
      .then(() => {
      if (!req.user.isActive) {
        logger("auth").error(`U1 => ${U1}`);
        throw new ApiError(httpStatus.UNAUTHORIZED, U1, "U1");
      }

      if (req.user.isDeleted) {
        logger("auth").error(`U2 => ${U2}`);
        throw new ApiError(httpStatus.UNAUTHORIZED, U2, "U2");
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = auth;
