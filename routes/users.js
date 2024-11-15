const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

// route for users , 
router.route('/:id')
    .get((req,res)=> {

    })
    .post((req,res)=> {

    })
    .delete((req,res)=> {
    
    })
//get all users when logged in as an admin only
router.route('/').
   get((req,res)=> {
   console.log(" get users here ")
   })
   .post((req,res)=> {
    console.log("add user here")
   })


module.exports = router;