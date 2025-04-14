const { config } = require("dotenv");
const expenseModel = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new expenseModel({
        title,
        amount,
        category,
        description,
        date,
        userId
    });

    try {
        if (!title || !category || !description || !date || !amount || !userId) {
            return res.status(400).json({ message: "Fields are required" });
        }

        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        await expense.save();
        res.status(200).json({ message: "Expense added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getExpense=async (req,res)=>{
 try{
  const expense=await expenseModel.find().sort({createdAt:-1});
  res.status(200).json(expense);

 }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
 }
}

exports.deleteExpense=async (req,res)=>{
    console.log(req.params);
    const {id}=req.params;
   expenseModel.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:"Expense Deleted Succefully"})
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error",error:err.message})
    })
   }