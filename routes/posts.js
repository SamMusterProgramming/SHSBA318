const express = require('express'); 
const router = express.Router();
const posts = require('../data/postData.js')
const users = require('../data/usersData.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


router.route('/')
    .get((req,res)=> {
            // get all posts posted by users 
            // logic here to merge each post with user's name , image_profile to display them along the post
            const usersPosts = []
            posts.forEach( post => {
            usersPosts.push({...post,...getUserById(post.user_id, users)})
            })    
            console.log(usersPosts)  
            return res.render('posts',{posts:usersPosts})})
    .post(upload.single('image'),(req,res)=> {
        if (!req.file) {
            console.log("iam here")
            res.status(400).send('No file uploaded.');
            return;
            }
            
            // You can perform additional operations with the uploaded image here.
            res.status(200).send('Image uploaded and saved successfully.');
})   
     
router.route('/:id')
    .get((req,res) => {
        // here I will filter the posts by user_id , return all posts with user_id
        const user_id = req.params.id;
        const userPosts =  posts.filter(post => post.user_id == user_id)
        const user = users.find(user => user.id == user_id) // we need the user to pass it to the users template
        console.log(user)
        res.render('users',{ user:user,posts:userPosts,users:null})
    })  


function getUserById(id , userslist) {
  return userslist.find(user => user.id == id)
}

module.exports = router