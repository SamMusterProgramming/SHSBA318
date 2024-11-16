const express = require('express'); 
const router = express.Router();
const posts = require('../data/postData.js')


router.route('/')
.get((req,res)=> {
    console.log(posts)
    // get all posts posted by users 
    return res.render('posts',{posts:posts})
}).post((req,res)=> {
    // add a post here 
})   
  


module.exports = router