const express = require('express'); 
const router = express.Router();
let posts = require('../data/postData.js')
const users = require('../data/usersData.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const comments = require('../data/commentsData.js')


let postId = 5 ; 
let user_id = -1 ; 
let commentId = 104;
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


router.route('/')
    .get((req,res)=> {
            // get all posts posted by users 
            // logic here to merge each post with user's name , image_profile to display them along the post
            const usersPosts = []
            posts.forEach( post => {
            usersPosts.push({...post,...getUserById(post.user_id, users)})
            })     
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
            comments_id: commentId    
        }  
        posts.push(newPost)
        postId++; 
        res.redirect(`/api/posts/${parseInt(req.body.user_id)}`)
    })      
     
router.route('/:id') 
    .get((req,res) => {
        // here I will filter the posts by user_id , return all posts with user_id
        user_id = req.params.id;   
        const userPosts =  posts.filter(post => post.user_id == user_id)
        userPosts.forEach(post => {
            post["comments"] = getComment(post.comments_id)
        })
        console.log(userPosts)
        const user = users.find(user => user.id == user_id) // we need the user to pass it to the users template
        res.render('users', { user:user,posts:userPosts,users:null,topPost:findTopPost(posts ,user_id)})
    })
    .delete((req,res)=> {
        const post_id = parseInt(req.params.id)
        posts = posts.filter(post => post.id !== post_id)
        const user = users.find(user => user.id == user_id)
        res.render('users',{user:user,posts:posts,users:null,topPost:findTopPost(posts,user_id)})
    })  
     
function getUserById(id , userslist) {
  return userslist.find(user => user.id == id)

}

function findTopPost(pos, userID) {
    let post = null;
    post = pos.find(post => {post.status == "top" && post.user_id == userID })
    return post ;
}
function getComment(commentID) {
    return comments.find(comment => comment.id == commentID)
}



module.exports = router