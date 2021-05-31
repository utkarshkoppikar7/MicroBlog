const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./models/user');
const Post = require('./models/posts');
const cors = require('cors');

class postC{
  constructor(username,content){
    this.username = username;
    this.content = content;
  }
}
var postFeed = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

let logs = []
let passes = []

const uri = "mongodb+srv://utkarsh:mypassword@utkarshcluster.n0muw.mongodb.net/SocialMedia?retryWrites=true&w=majority";

mongoose.connect(uri , { useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex :true})
  .then((result)=> console.log("Connected!!!"))
  .catch((err) => console.log(err));
// set this Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//schema


//Users
app.post('/addUser',(req,res) => {
  var s = req.body;
  var keys = [];
   for(var k in s) keys.push(k);
  const data = JSON.parse(keys[0]);

  const uname1 = data.username;
  const pword1 = data.password;    
  const user = new User(
        {
          username: uname1,
          password: pword1
        }
      );
      
      user.save()
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log(err);
        });
});

app.post('/users',(req,res) => {
  var s = req.body;
  var keys = [];
   for(var k in s) keys.push(k);
  const data = JSON.parse(keys[0]);

  const uname1 = data.username;
  const pword1 = data.password;
  let flag =0;

  User.find()
    .then((result) => {
      flag=0;
      for(let i=0;i<result.length;i++){
        if(result[i].username==uname1){
          if(result[i].password==pword1){
            flag=1;
        }
      }
    }
    if(flag==1){
      res.send("OK")
      console.log("User logged in");
    }
    else{
      res.send("NOK");
      console.log("Failed log in");
    }
      
    })
    .catch((err) => {
      console.log(err);
    });
}).listen(process.env.PORT || 5000)

// Posts
app.post('/addPost', (req,res) => {
  console.log(req);
  var s = req.body;
  var keys = [];
   for(var k in s) keys.push(k);
  const data = JSON.parse(keys[0]);

  const uname1 = data.username;
  const content1 = data.content;    
  const post = new Post(
        {
          username: uname1,
          content: content1
        }
      );
      
      post.save()
        .then((results) => {
          res.send(results);
          console.log(results);
        })
        .catch((err) => {
          console.log(err);
        });

});
 
app.get('/test',(req,res)=>{
  res.send("App is running");
})

app.get('/getPosts', (req,res) => {
  Post.find()
    .then((result) => {
      postFeed = []
      for(let i=0;i<result.length;i++){
        postFeed.push(new postC(result[i].username,result[i].content));
      }
      res.send(postFeed);
    })
    .catch((err) => {
      console.log(err);
    });
});
