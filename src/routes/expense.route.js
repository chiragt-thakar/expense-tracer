const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.js");
const {
  createExpenseController,
  getExpenseByIdController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
} = require("../controller/expense.controller.js");
const {
  createExpenseValidation,
  updateExpenseValidation,
  getExpenseValidation,
  deleteExpenseValidation,
} = require("../validations/expense.validation.js");
const validate = require("../middlewares/validate.js");

router
  .route("/")
  .post(
    auth,
    validate(createExpenseValidation),
    createExpenseController
  )
  .get(auth,getAllExpensesController );
router
  .route("/:id")
  .put(
    auth,
    validate(updateExpenseValidation),
    updateExpenseController
  )
  .get(
    auth,
    validate(getExpenseValidation),
    getExpenseByIdController
  )
  .delete(
    auth,
    validate(deleteExpenseValidation),
    deleteExpenseController
  );




// router.post("/", createExpenseController);
// router.get("/:id", getExpenseByIdController);
// router.get("/", getAllExpensesController);
// router.put("/:id", updateExpenseController);
// router.delete("/:id", deleteExpenseController);

module.exports = router;
