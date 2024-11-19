const express = require('express'); 
const router = express.Router();
let posts = require('../data/postData.js')
const users = require('../data/usersData.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs')

let postId = 5 ; 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
    //   cb(null, Date.now() + '-' + file.originalname);
    cb(null,file.originalname);
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
            res.status(400).send('No file uploaded.');
            return;
            }
        let newPost =  {
            id: postId ,
            user_id: parseInt(req.body.user_id),
            image_url: "/static/uploads/" + req.file.originalname,
            description : req.body.description,
            date : new Date(),
            likes_count : 0,
            status : "no", 
            comments_id: 100   
        }  
        console.log(newPost) 
        posts.push(newPost)
        postId++; 
        res.redirect(`/api/posts/${parseInt(req.body.user_id)}`)
    })      
     
router.route('/:id')
    .get((req,res) => {
        // here I will filter the posts by user_id , return all posts with user_id
        const user_id = req.params.id;
        const userPosts =  posts.filter(post => post.user_id == user_id)
        const user = users.find(user => user.id == user_id) // we need the user to pass it to the users template
        res.render('users',{ user:user,posts:userPosts,users:null})
    })  


function getUserById(id , userslist) {
  return userslist.find(user => user.id == id)
}

module.exports = router