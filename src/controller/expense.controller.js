const catchAsync = require("../../common/catchAsync");
const response = require("../../common/response");
const { EX1, EX6, EX5, EX4, EX2, EX3 } = require("../messages/expense.message");
const {
  createExpenseService,
  getExpenseByIdService,
  getAllExpensesService,
  updateExpenseService,
  deleteExpenseService,
} = require("../services/expense.service");

const createExpenseController = catchAsync(async (req, res) => {
  const expense = await createExpenseService(req.body);
  return res.send(response.success(EX1, "EX1", expense));
});

const getExpenseByIdController = catchAsync(async (req, res) => {
  const expense = await getExpenseByIdService(req.params.id);
  if (!expense) return res.send(response.error(EX6, "EX6", {}));
  return res.send(response.success(EX4, "EX4", expense));
});

const getAllExpensesController = catchAsync(async (req, res) => {
  const expenses = await getAllExpensesService(req);
  if (!expenses) return res.send(response.error(EX6, "EX6", {}));
  return res.send(response.success(EX5, "EX5", expense));
});

const updateExpenseController = catchAsync(async (req, res) => {
  const expense = await updateExpenseService(req.params.id, req.body);
  if (!expense) return res.send(response.error(EX6, "EX6", {}));
  return res.send(response.success(EX2, "EX2", expense));
});

const deleteExpenseController = catchAsync(async (req, res) => {
  
    const expense = await deleteExpenseService(req.params.id);
    if (!expense) return res.send(response.error(EX6, "EX6", {}));
    return res.send(response.success(EX3, "EX3", expense));
  
});

module.exports = {
  createExpenseController,
  getExpenseByIdController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
};
