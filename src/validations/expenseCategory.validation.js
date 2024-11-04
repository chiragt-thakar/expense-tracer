const Joi = require("joi");
const { param } = require("../routes/expenseCategory.route");

const createExpenseCategoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};
const updateExpenseCategoryValidation = {
  params: Joi.object({
    categoryId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
  }),
};
const getExpenseCategoryValidation = {
  params: Joi.object({
    categoryId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};
const deleteExpenseCategoryValidation = {
  params: Joi.object({
    categoryId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
};

module.exports = {
  createExpenseCategoryValidation,
  getExpenseCategoryValidation,
  updateExpenseCategoryValidation,
  deleteExpenseCategoryValidation,
};
