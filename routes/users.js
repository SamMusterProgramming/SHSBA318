const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const users = require('../data/usersData.js') 


let session = null;
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


router.route('/login').
    get((req,res)=> {
    // log user session here
    if(session){
        return res.render("users",{user:session})
    }
    return res.redirect('/api')
    }).post((req,res)=> {
        // log user session here
        if(!session){
        const user = users.find(user => user.email == req.body.email && user.password == req.body.password)
        if(user)
        return res.render("users",{user:user,posts:null})
        else return res.redirect('/api')
        }
        return res.render("users",{user:session,posts:null})
     })

router.post('/register',(req,res)=> {
    // register here
    const newUser = {  
        id:user_id,
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    // no need to validate email and username , sake of time , i will just validate passwords here if they match
    if(req.body.password !== req.body.confirmpassword) 
    return res.render('home.ejs',{action:"register",placeHolders:req.body})
    // create session here and log in the user 
    session = newUser;
    res.redirect('/api/users/login')
    })

// access specific user by parameter / query  
router.route('/:id')
   .get((req,res)=> {
      const user_id = req.params.id; 
      console.log(user_id)  
      const user = users.find(user => user.id == user_id)
      console.log(user)
      res.render('users', { user:user, posts:null}) 
   })  
   .patch((req,res)=> {  
     
   })
   .delete((req,res)=> {
    
   })
function checkUserExist(req,res,next) {
       
}



module.exports = router;
