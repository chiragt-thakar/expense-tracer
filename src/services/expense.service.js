const ObjectId = require('mongoose').Types;

const Expense = require("../models/expense.model");

const createExpenseService = async (data) => {
  return await Expense.create(data);
};

const getExpenseByIdService = async (id) => {
  return await Expense.findById(id).populate("userId categoryId");
};

const getAllExpensesService = async (req) => {
    let filter = { isDeleted: false };
    if (req.query.userId){filter.userId= new ObjectId(req.query.userId)}
  return await Expense.find(filter).populate("userId categoryId");
};

const updateExpenseService = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, { new: true });
};

const deleteExpenseService = async (id) => {
  return await Expense.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = {
  createExpenseService,
  getExpenseByIdService,
  getAllExpensesService,
  updateExpenseService,
  deleteExpenseService,
};
