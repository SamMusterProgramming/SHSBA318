const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const users = require('../data/usersData.js') 
const multer = require('multer')

let session = null;  
let user_id = 5;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/uploads/`);
    },
    filename: (req, file, cb) => {
    //   cb(null, Date.now() + '-' + file.originalname);
    cb(null,file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// route for users ,   
router.route('/')   
      //get all users when logged in as an admin only
      .get((req,res )=> {
        noAdminUsers = users.filter(user => user.id !== 0)  // exclude the admin from users list
        return   res.render('users',{user:session,users:noAdminUsers,posts:null,topPost:null} )
      })
      .post((req,res,next)=> {      
         // validate registration here and add user
         if(req.body.username && req.body.email&& req.body.password){
         const newUser = {     
            id:user_id,
            name:req.body.name,         
            username:req.body.username,
            profile_img : "/static/asset/avatar.avif",
            email:req.body.email,
            password:req.body.password
        }
        // no need to validate email and username , sake of time , i will just validate passwords here if they match
        if(req.body.password !== req.body.confirmpassword) 
        return res.render('home.ejs',{action:"register",placeHolders:req.body})
        // create session here and redirect to log in new user 
        session = newUser;
        users.push(newUser);  
        user_id ++;           
        return res.redirect('/api/users/login')
       }
       next();
      }
    )
       
//user athentification here 
router.route('/login')
      .get((req,res)=> {
            // log new user session here
            if(session){
                return res.render("users",{user:session,posts:null,users:null,topPost:null})
            }
            return res.redirect('/api') 
      })                 
      .post((req,res)=> {     
            // log the existent user here        
            if(!session){    
            const user = users.find(user => user.email == req.body.email && user.password == req.body.password)
            if(user){
            user.id == 0 ? session = {...user,...{["admin"]:"yes"} } : session = user ;   
            return res.render("users",{user:session,posts:null,users:null,topPost:null})
            }
            else return res.redirect('/api')
            }   
            return res.redirect("/login")
})         

// log out here   
router.get('/logout', (req,res)=> {       
    session = null;     
    user_id = 5; 
    res.redirect('/api')     
})         

// access specific user by parameter / query  
router.route('/:id')       
            .get((req,res,next)=> {          
                const user_id = req.params.id; 
                const user = users.find(user => user.id == user_id)
                if(user)
                  return res.render('users', { user:user, posts:null,users:null,topPost:null}) 
              next()  
            })              
            .patch((req,res,next)=> {  
               
            })          
            .delete((req,res,next)=> { // only admin can delete the user or the user himself
                const user_id = req.params.id;
                const user =  users.find((user,index)=> {
                    if(user.id == user_id){
                        users.splice(index,1);
                        return true
                    }
                })                
                if(user) 
                  return res.redirect('/api/users')
                next()  
            })     
                
function checkUserExist(req,res,next) {
       
}
 


module.exports = router;
