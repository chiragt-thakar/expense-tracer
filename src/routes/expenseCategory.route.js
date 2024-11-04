const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.js");
const auth = require("../middlewares/auth.js");
const {
  createExpenseCategoryValidation,
  updateExpenseCategoryValidation,
  getExpenseCategoryValidation,
  deleteExpenseCategoryValidation,
} = require("../validations/expenseCategory.validation.js");
const { createExpenseCategoryController, getAllExpenseCategoryController, updateExpenseCategoryController, getExpenseCategoryController, deleteExpenseCategoryController } = require("../controller/expenseCategory.controller.js");

router
  .route("/")
  .post(auth, validate(createExpenseCategoryValidation),createExpenseCategoryController)
  .get(auth,getAllExpenseCategoryController);
router
  .route("/:categoryId")
  .patch(auth, validate(updateExpenseCategoryValidation),updateExpenseCategoryController)
  .get(auth, validate(getExpenseCategoryValidation),getExpenseCategoryController)
  .delete(auth, validate(deleteExpenseCategoryValidation),deleteExpenseCategoryController);

module.exports = router;
