var express = require("express");
var router = express.Router();

const authRoute = require("./auth.route.js");
const expenseCategory = require('./expenseCategory.route.js')
const expense = require('./expense.route.js')

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/expenseCategory",
    route: expenseCategory,
  },
  {
    path: "/expense",
    route: expense,
  },
];

routes.forEach((element) => {
  router.use(element.path, element.route);
});


module.exports = router;
