const mongoose=require("mongoose");

const ExpenseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        required:true,
        trim:true,
        // default:Date.now
    },
    category:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authSchema",
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model("ExpenseSchema", ExpenseSchema);
