const express = require('express'); 
const router = express.Router();
const posts = require('../data/postData.js')
const users = require('../data/usersData.js')

router.route('/')
.get((req,res)=> {
    console.log(posts)
    // get all posts posted by users 
    // logic here to merge each post with user's name , image_profile to display them along the post
    const usersPosts = []
    posts.forEach( post => {
      usersPosts.push({...post,...getUserById(post.user_id, users)})
    })
    console.log(usersPosts)
    return res.render('posts',{posts:usersPosts})
}).post((req,res)=> {
    // add a post here    
})   
  
function getUserById(id , userslist) {
  return userslist.find(user => user.id == id)
}

module.exports = router