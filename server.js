//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;

//Port
//Allow use of Heroku's port or local Port
const PORT = process.env.PORT || 3000

//Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'stcpetshop'

//Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected: ', MONGODB_URI));
db.on('Disconnected', () => console.log('Mongo disconnected'));

//Open connection to Mongo
db.on('open', ()=>{});

//Middleware
//Use public folder for static assests (CSS)
app.use(express.static('public'));

//Populated req.body with parsed info from forms, if no data, return empty
app.use(express.urlencoded({ extended: false}));

//Method Override
//PUT and DELETE + GET and POST
app.use(methodOverride('_method'));

//Routes
app.get('/', (req, res)=>{
  res.send('Hello world!');
});

//Listener
app.listen(PORT, ()=>{
  console.log('Listening');
})
