const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  from: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  to: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  amount: {
    type: Number,
    require: true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: "expenseCategory",
  },

  isIndividual: {
    type: Boolean,
    default: false,
  },
  isSettled: {
    type: Boolean,
    default: false,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Transaction = mongoose.model(
  "transaction",
  transactionSchema,
  "transactions"
);
module.exports = Transaction;
