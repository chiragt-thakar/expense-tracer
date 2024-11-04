const fs = require("fs");
const path = require("path");


const httpStatus = require("http-status");

const config = require("../configs/config");
const ApiError = require("../common/apiError");
const Utils = require("../utils/response");
const { deleteURL } = require("../utils/s3");

const logger = require("../scripts/logger.js");

const errorConverter = async (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const messageCode = error.messageCode || "";
    const result = error.result || {};
    error = new ApiError(
      statusCode,
      message,
      messageCode,
      result,
      false,
      err.stack
    );
  }

  if (req?.file?.path) {
    const deleteFile = path.join(__dirname, "../..", req.file.path);
    logger.info(`Single File Removed Because of Error : ${req.file.path}`);
    if (fs.existsSync(deleteFile)) {
      fs.unlinkSync(deleteFile);
    }
  }

  if (req?.file?.key) {
    logger.info(`Single File Removed Because of Error : ${req.file.key}`);
    await deleteURL(req.file.key);
  }

  if (req.files) {
    for (const file in req.files) {
      const element = req.files[file];
      if (element.length) {
        element.forEach(async (ele) => {
          logger.info(`Multi File Removed Because of Error : ${ele.key}`);
          await deleteURL(ele.key);
        });
      }
    }
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, messageCode, result } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(["development", "test"].includes(config.env) && { stack: err.stack }),
  };

  logger.error(`${req.url} URL ....`);
  logger.error(message);
  logger.error(err.stack);

  res
    .status(statusCode || httpStatus.BAD_GATEWAY)
    .send(Utils.error(result, message, messageCode));
};

module.exports = {
  errorConverter,
  errorHandler,
};
