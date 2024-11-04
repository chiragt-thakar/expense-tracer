const Joi = require("joi");
const pick = require("../utils/pick.js");
const ApiError = require("../../common/apiError.js");
const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: true })
    .validate(object);

  if (error) {
    // this function is for when we upload files on s3 or local but get error in this function then remove all files from storage
    if (req.files) {
      for (const file in req.files) {
        const element = req.files[file];
        if (element.length) {
          element.forEach(async (ele) => {
            await deleteURL(ele.key);
          });
        }
      }
    }

    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
module.exports = validate;
