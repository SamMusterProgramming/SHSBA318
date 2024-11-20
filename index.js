const express = require ('express')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const bodyParser = require('body-parser')
 

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 8000 ; 
const app = express();

app.use(express.json());
app.use(urlencodedParser)
         
//routes to users, posts    
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)     
app.use('/static', express.static('public'))


//use app view to access templates , I am using ejs to render templates
app.set("view engine", "ejs"); 
app.set("users", "./views");     
app.set("home", "./views"); 
app.set("posts", "./views");
app.set("error", "./views");

  
// routes
app.get('/api',(req,res) => { 
   res.render('home' , {action:"login"})
})
app.get('/api/register',(req,res) => {
    return res.render('home' , {action:"register", placeHolders:{}})
}) 


// handle errors meddleware
app.use((req, res, next) => {
   next(error(404, "Resource Not Found")); // common errors resource not found
});

app.use((err, req, res, next) => {
   return res.render('error',{error:err.message, status:err.status})
});

function error(status, msg) {
   var err = new Error(msg);
   err.status = status;
   return err;
 }

app.listen(PORT,()=> {
   console.log(`listening on port ${PORT}`)
})

