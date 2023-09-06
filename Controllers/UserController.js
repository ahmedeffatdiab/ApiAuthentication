const UserModel=require('../Models/UserModel');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken')

const signup=async (req,res,next)=>{
    try{
        const {first_name,last_name,username,email,password}=req.body;
        const spassword=await bcryptjs.hash(password,10);
        const User=new UserModel({
            First_name:first_name,
            Last_name:last_name,
            Username:username,
            Email:email,
            Password:spassword
        });
        const userData=await UserModel.findOne({Email:email});
        if(userData){
            res.send({status:"false",message:"the email is alerdy exist"});
        }else{
            const user_data=await User.save();
            res.status(200).send({message:"success",data:user_data});
        }
    }catch(err){
        res.status(400).json({message:err})
    }
    
}
const login=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({Email:email});
        if(user){
            const passwordMatch=await bcryptjs.compare(password,user.Password);
                if(passwordMatch){
                    const Token=await jwt.sign({UserData:user},"thisismysecretkey")
                    const data={
                        _id:user._id,
                        first_name:user.First_name,
                        last_name:user.Last_name,
                        age:user.Age,
                        email:user.Email,
                        password:user.Password,
                        token:Token
                    }
                    res.status(200).json({  success:true,message:"success",data:data})
                }else{
                res.send({success:false,message:"error in password "})
                }
        }else{
            res.send({success:false,message:"error in Email"})
    
        }
    }catch(err){
        res.status(400).json({error : err})
    }
}
module.exports={signup,login};