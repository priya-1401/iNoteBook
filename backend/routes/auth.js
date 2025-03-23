const express=require('express')
const User=require('../models/User')
const router=express.Router()
const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="hi this is jwt"

router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({min: 3}),
    body('password','Password must be atleast 5 characters').isLength({min: 5})
],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    //check whether the user with this email exists
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"A user exists with this email"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    })
    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=await jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,authtoken});
});

//authenticate the user
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"Try to login with correct credentials"});
        }
        const passwordcomapre=await bcrypt.compare(password,user.password);
        if(!passwordcomapre){
            success=false;
            return res.status(400).json({success,error:"Try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=await jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

// get user details
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password") 
        res.send(user);
    } catch (error) {
        console.error(error.message);
            res.status(500).send("Internal error occured");
    }
})
module.exports=router