const Joi = require("joi");

const registerValidation = {
  body: Joi.object({
    firstName: Joi.string().trim().required().messages({
      "string.base": "First name should be a type of text",
      "string.empty": "First name is required",
    }),
    lastName: Joi.string().trim().required().messages({
      "string.base": "Last name should be a type of text",
      "string.empty": "Last name is required",
    }),
    email: Joi.string().email().trim().required().messages({
      "string.base": "Email should be a type of text",
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password should be a type of text",
      "string.min": "Password should have at least 6 characters",
      "string.empty": "Password is required",
    }),
  }),
};
const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.base": "Email should be a type of text",
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password should be a type of text",
      "string.min": "Password should have at least 6 characters",
      "string.empty": "Password is required",
    }),
  }),
};

module.exports = { registerValidation, loginValidation };
