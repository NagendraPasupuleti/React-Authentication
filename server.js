const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const mongoose=require('mongoose');

//configure the cors
app.use(cors());

//configure the dotenv
dotenv.config({path:'./config/config.env'})

//configure the body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const port=8001;

mongoose.connect(process.env.MONGO_DB_URL_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false

}).then((response)=>{
    console.log(`Connected to mongoDB Successfully`)

}).catch((error)=>{
    console.error(error);
    process.exit(1)

});

//configure the router
app.use('/user',require('./router/userRouter'))


app.get('/',(request,response)=>{
    response.send(`<h3>Welcome to React Authenication</h3>`)

});
app.listen(port,()=>{
    console.log(`Server is Started at : http://127.0.0.1:${port}`)
})








/*

const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv")
const mongoose=require("mongoose")


//configure the cors
app.use(cors());
//configure dotenv
dotenv.config({path:'./config/config.env'});
//configure the Body-parser
app.use(express.json());
app.use(express.urlencoded({extended:false}))



const port=9000;


//connect to mongoDb

mongoose.connect(process.env.MONGO_DB_URL_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,useFindAndModify:false


}).then((response)=>{
    console.log(`connected to mongoDB Database SuccessFully`)

}).catch((err)=>{
    console.error(err);
    process.exit(1)

})

app.get('/',(request,response)=>{
    response.send(`<h2>Welcome to React Authentication Backend server</h2>`)

})

app.listen(port,()=>{
    console.log(`Server is started at :http://127.0.0.1:${port}`)
})

*/
