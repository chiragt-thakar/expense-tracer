const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "expenseCategory",
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
  },
  amount: {
    type: Number,
    require: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});



const Expense = mongoose.model("expense", expenseSchema, "expenses");
module.exports = Expense;
