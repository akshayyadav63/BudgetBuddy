const mongoose=require('mongoose');
const authSchema= new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    profileImage: {
        type: String,
        default: '../profileImage/avatar.png'
    }
})
module.exports=mongoose.model("authSchema",authSchema);