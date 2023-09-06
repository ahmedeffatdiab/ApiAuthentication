const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    First_name:{
        type:String,
        required:true,
    },
    Last_name:{
        type:String,
        required:true,
    },
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Token:{
        type:String,
        default:''
    }
})
module.exports=mongoose.model("User",UserSchema)