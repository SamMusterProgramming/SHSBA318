const express = require ('express')
const usersRoute = require('./routes/users')
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 8080 ; 
const app = express();

app.use(express.json());
app.use(urlencodedParser)

//routes to users, posts
app.use('api/users', usersRoute)

//use app view to access templates , I am using ejs to render templates
app.set("view engine", "ejs");
app.set("users", "./views"); 
app.set("home", "./views"); 
app.set("post", "./views");

// routes
app.get('/',(req,res) => {
    res.render('home')
})


app.listen(PORT,()=> {
  console.log(`listening on port ${PORT}`)
})

