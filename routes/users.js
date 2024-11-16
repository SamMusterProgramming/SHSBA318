const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const users = require('../data/usersData.js') // get users data here

let session = {};
let user_id = 5;
// route for users , 
//get all users when logged in as an admin only
router.route('/').
   get((req,res)=> {
   console.log(" get all users here ")
   })
   .post((req,res)=> {
    console.log("add user here")
   })

//user athentification here 
router.post('/login',(req,res)=> {
   // log user session here
   console.log("succesfully logged in ") 
})
router.post("/register",(req,res)=> {
    // register here
    const newUser = { 
        id: user_id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    // no need to validate email and username , sake of time , i will just validate passwords here if they match
    if(req.body.password !== req.body.confirmpassword) return res.render('home.ejs',{action:"register"})
    // create session here and log in the user
    session = newUser;
    res.redirect('/login')
    }
)

// access specific user by parameter / query  
router.route('/:id')
   .get((req,res)=> {

   })
   .post((req,res)=> {

   })
   .delete((req,res)=> {
   
   })


module.exports = router;