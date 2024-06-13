const express = require('express')
const app = express();
const db = require('./db');
const passport = require('./auth');


require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Middleware function 
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleDateString()}] Request Made to : ${req.originalUrl}`);
    next(); //move to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})


app.get('/' ,localAuthMiddleware,function(req,res){
    res.send('Welcome to my hotel ...How can I help you?')
})


//import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the router files
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware ,menuItemRoutes);

const PORT = process.env.PORT||3000;

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})