const ExpenseCategory = require("../models/expenseCategory.model");

const createExpenseCategoryService = (body) => {
  return ExpenseCategory.create(body);
};
const updateExpenseCategoryService = (catId, body) => {
  const category = ExpenseCategory.findByIdAndUpdate(
    { _id: catId, isDeleted: false },
    { $set: body },
    { new: true }
  );
  return category;
};

const getExpenseCategoryService = (catId) => {
  return ExpenseCategory.findById({ _id: catId, isDeleted: false });
};
const deleteExpenseCategoryService = (catId) => {
 return ExpenseCategory.findByIdAndUpdate(
    { _id: catId, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
};
const getAllExpenseCategoryService = (name) => {
  let filter = {};
  if (name) {
    filter = {
      name: {
        $regex: `^${name}`,
        $options: "i",
      },
    };
  }
  return ExpenseCategory.find(filter);
};

module.exports = {
  createExpenseCategoryService,
  updateExpenseCategoryService,
  getExpenseCategoryService,
  deleteExpenseCategoryService,
  getAllExpenseCategoryService,
};
