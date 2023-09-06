const http=require('http');
const express=require('express');
const router=require('./Routes/UserRoute')
const cors=require('cors');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://ahmedeffat:OepKsTkxyw0bhmny@developing.qrlutdv.mongodb.net/test')
  .then(() => {
    console.log("Connected to DB is success");
  })
  .catch((err) => {
    console.log(err);
  });

const app=express();
const server=http.createServer(app);
const port=process.env.POST || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
  }) 
  
app.use('/api',router)
app.use(cors())
server.listen(port,()=>{
    console.log("sever is ready");
})