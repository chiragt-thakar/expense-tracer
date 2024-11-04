const { defaults } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseCategorySchema = new Schema({
  name: {
    type: String,
    trim:true
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    defaults: false,
  },
});

const ExpenseCategory = mongoose.model(
  "expenseCategory",
  expenseCategorySchema,
  "expenseCategories"
);
module.exports = ExpenseCategory;
