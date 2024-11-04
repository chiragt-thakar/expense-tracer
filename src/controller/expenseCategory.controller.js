const httpStatus = require("http-status");
const ApiError = require("../../common/apiError");
const catchAsync = require("../../common/catchAsync");
const response = require("../../common/response");
const { EC1, EC2, EC6, EC7, EC4 } = require("../messages/expenseCategory.message");
const {
  createExpenseCategoryService,
  updateExpenseCategoryService,
  getExpenseCategoryService,
  deleteExpenseCategoryService,
} = require("../services/expenseCategory.service");

const createExpenseCategoryController = catchAsync(async (req, res) => {
  const category = await createExpenseCategoryService(req.body);
  return res.send(response.success("EC1", EC1, category));
});
const updateExpenseCategoryController = catchAsync(async (req, res) => {
  const category = await getExpenseCategoryService(req.params.categoryId);
  if (!category || category.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, EC6, "EC6", {});
  }
  if (!category.isActive) {
    throw new ApiError(httpStatus.NOT_FOUND, EC7, "EC7", {});
  }
  const updatedCategory = await updateExpenseCategoryService(
    req.params.categoryId,
    req.body
  );
  return res.send(response.success("EC2", EC2, updatedCategory));
});
const getExpenseCategoryController = catchAsync(async (req, res) => {
  const category = await getExpenseCategoryService(req.params.categoryId);
  if (!category || category.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, EC6, "EC6", {});
  }
  if (!category.isActive) {
    throw new ApiError(httpStatus.NOT_FOUND, EC7, "EC7", {});
  }
  return res.send(response.success("EC4", EC4, category));
});
const deleteExpenseCategoryController = catchAsync(async (req, res) => {
  const category = await getExpenseCategoryService(req.params.categoryId);
  if (!category || category.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, EC6, "EC6", {});
  }
  if (!category.isActive) {
    throw new ApiError(httpStatus.NOT_FOUND, EC7, "EC7", {});
  }
  const categoryData = await deleteExpenseCategoryService(req.params.categoryId);
    
  return res.send(response.success("EC4", EC4, categoryData));
});
const getAllExpenseCategoryController = catchAsync(async (req, res) => {
  const category = await getExpenseCategoryService();
  return res.send(response.success("EC3", EC3, category));
});
module.exports = {
  createExpenseCategoryController,
  updateExpenseCategoryController,
  getExpenseCategoryController,
  getAllExpenseCategoryController,
  deleteExpenseCategoryController,
};
