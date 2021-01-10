const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const User=require('../models/User');
const bcypt=require('bcryptjs');
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');

/*
usage:To Register a User
path:/user/Register
fields:name,email,password
*/
router.post('/register',[
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Proper Email is required'),
    check('password').isLength({min:6}).withMessage('Minimum 6 characters for password')
],async (request,resposne)=>{
    let errors=validationResult(request);
  //if it contains errors
    if(!errors.isEmpty()){
      return resposne.status(400).json({errors:errors.array()});
    }

    try{
        let {email,name,password}=request.body;  //To get the form data

        let user=await User.findOne({email})
        if(user){
            return resposne.status(400).json({errors:[{
                msg:'User is Already Exits'
                }]});
        }


        //encode the password

        let salt=await bcypt.genSalt(10);
        password=await bcypt.hash(password,salt)


        //get the avatar
        let avatar=gravatar.url(email,{
            s:"200",
            r:"pg",
            d:"mm"
        })


        //store the user
        user=new User({name,email,password,avatar});
        await user.save()


        //json web token
        let payload={
            user:{
                id:user.id,
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET_KEY,(err,token)=>{
            if(err) throw err
            resposne.status(200).json({
                result:'Success',
                token:token
            })

        })


    }
    catch (err) {
        console.error(err)
        resposne.status(500).json({errors:[{
            msg:err.message
            }]})

    }

})







module.exports=router