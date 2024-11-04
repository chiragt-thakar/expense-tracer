const Joi = require("joi");

const createExpenseValidation = {
  body: Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required",
    }),
    categoryId: Joi.string().required().messages({
      "string.empty": "Category ID is required",
    }),
    type: Joi.string().valid("credit", "debit").required().messages({
      "any.only": "Type must be either 'credit' or 'debit'",
    }),
    amount: Joi.number().positive().required().messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be a positive value",
      "any.required": "Amount is required",
    }),
  }),
};

const updateExpenseValidation = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Expense ID is required",
    }),
  }),
  body: Joi.object({
    userId: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    type: Joi.string().valid("credit", "debit").optional(),
    amount: Joi.number().positive().optional(),
  })
    .min(1)
    .messages({
      "object.min": "At least one field must be updated",
    }),
};

const getExpenseValidation = {
  params: Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "Expense ID is required",
    }),
  }),
};

const deleteExpenseValidation = {
    params: Joi.object({
      id: Joi.string().required().messages({
        "string.empty": "Expense ID is required",
      }),
    }),
  };

module.exports = {
  createExpenseValidation,
  updateExpenseValidation,
  getExpenseValidation,
  deleteExpenseValidation,
};
