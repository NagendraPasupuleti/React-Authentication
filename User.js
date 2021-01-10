const mongoose=require('mongoose');
let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,required:true

    }


});

let User=mongoose.model('user',UserSchema);
module.exports={User}





/*
const mongoose=require('mongoose');

let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now()
    }

});
let User=mongoose.model('user',UserSchema)
module.exports=User
*/
