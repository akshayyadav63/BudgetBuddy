const { config } = require("dotenv");
const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new Income({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        if (!title || !category || !date || amount === undefined || amount === null) {
            return res.status(400).json({ message: "Fields are required" });
          }

        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        await income.save();
        res.status(200).json({ message: "Income added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getIncome=async (req,res)=>{
 try{
  const incomes=await Income.find().sort({createdAt:-1});
  res.status(200).json(incomes);

 }catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
 }
}

exports.deleteIncome=async (req,res)=>{
    console.log(req.params);
    const {id}=req.params;
    Income.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"income Deleted Succefully"})
    })
    .catch((err)=>{
        res.status(500).json({message:"Server Error",error:err.message})
    })
   }