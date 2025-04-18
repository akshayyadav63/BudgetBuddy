const express = require('express');
const router = express.Router();

const {
  addIncome,
  getIncome,
  deleteIncome
} = require("../controllers/income");
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');


router.post('/add-income', addIncome);
router.get("/get-income", getIncome);
router.get("/get-income/:userId",getIncome);
router.delete("/delete-income/:id", deleteIncome);

// expense routes
 router.post("/add-expense",addExpense)
        .get("/get-expense",getExpense)
        .get("/get-expense/:userId",getExpense)
        .delete('/delete-expense/:id',deleteExpense)

module.exports = router;
