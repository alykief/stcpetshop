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
//Require petSchema
const Pet = require('./models/pets.js');

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

//Populated req.body with parsed info from forms, if no data, return empty
app.use(express.urlencoded({ extended: false}));

//Method Override
//PUT and DELETE + GET and POST
app.use(methodOverride('_method'));

//Routes
//Link INDEX
app.get('/pets', (req, res)=>{
  Pet.find({}, (err, allPets)=>{
    res.render('index.ejs', {
      pets: allPets
    });
  });
});

//Link NEW
app.get('/pets/new', (req, res)=>{
  res.render('new.ejs');
});

//Link SHOW
app.get('/pets/:id', (req, res)=>{
  Pet.findById(req.params.id, (err, foundPet)=>{
    res.render('show.ejs', {
      pet: foundPet
    });
  });
});

//Link EDIT
app.get('/pets/:id/edit', (req,res)=>{
  Pet.findById(req.params.id, (err, foundPet)=>{
    res.render('edit.ejs', {
      pet: foundPet
    });
  });
});

//Define PUT
app.put('/pets/:id', (req, res)=>{
  if (req.body.readyToGo === 'on'){
    req.body.readyToGo = true;
  } else {
    req.body.readyToGo = false;
  }
  Pet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatePet)=>{
    res.redirect('/pets/:id');
  });
});

//Define POST
app.post('/pets', (req, res)=>{
  if (req.body.readyToGo === 'on'){
    req.body.readyToGo = true;
  } else {
  req.body.readyToGo = false;
}
///Send created pet to array
  Pet.create(req.body, (err, createdPet)=>{
    res.redirect('/pets');
  });
});

//Define DELETE
app.delete('pets/:id', (req, res)=>{
  res.redirect('/pets');
});

//Listener
app.listen(PORT, ()=>{
  console.log('Listening');
})
