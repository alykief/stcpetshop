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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'stcpetshop';
//Require petSchema
const Pet = require('./models/pets.js');

//Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected: ', MONGODB_URI));
db.on('Disconnected', () => console.log('Mongo disconnected'));

//Open connection to Mongo
db.on('open', () => {});

//Middleware
//Use public folder for static assests (CSS)

//Method Override
//PUT and DELETE + GET and POST
app.use(methodOverride('_method'));
//Populated req.body with parsed info from forms, if no data, return empty
app.use(express.urlencoded({
  extended: false
}));
//Static
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to STC Pet Shop');
});
//Link INDEX
app.get('/pets', (req, res) => {
  Pet.find({}, (err, allPets) => {
    res.render('index.ejs', {
      pets: allPets
    });
  });
});

//Seed
app.get('/pets/seed', (req, res) => {
  Pet.create([
    {
      species: 'Dogs',
      breed: 'Chihuahua',
      img: './images/chihuahuas.jpg',
      readyToGo: true,
      price: 1200,
      qty: 5,
      rating: 4,
      review: ['Barks a lot but loyal and loving.', 'Easy to travel with and very adoring of owner!', 'Too tiny to play with normal sized dogs without worrying', 'Extremely intelligent']
    }, {
      species: 'Amphibians',
      breed: 'Blue Poison Dart Frog',
      img: './images/bluepoisondartfrogs.jpg',
      readyToGo: true,
      price: 55,
      qty: 8,
      rating: 3,
      review: ['Difficult to maintain cleanliness in tank but very intriguing creatures']
    }, {
      species: 'Dogs',
      breed: 'Golden Retriever',
      img: './images/goldenretrievers.jpg',
      readyToGo: false,
      price: 2500,
      qty: 4,
      rating: 4,
      review: ['Loyal and loving!', 'Great dog to have around children and other animals. Incredibly social and loyal.', 'Perfect hunting dog!']
    }, {
      species: 'Reptiles',
      breed: 'Bearded Dragon',
      img: './images/beardeddragons.jpg',
      readyToGo: true,
      price: 80,
      qty: 2,
      rating: 2,
      review: ['Easy to care for, great beginniner pet', 'Fun to create a new habitat without worrying about animal health and well-being.']
    }, {
      species: 'Cats',
      breed: 'Maine Coon',
      img: './images/mainecoons.jpg',
      readyToGo: true,
      price: 1500,
      qty: 5,
      rating: 4,
      review: ['The best breed of cats! Adorable as heck, duh!']
    },
    {
      species: 'Reptiles',
      breed: 'Veiled Chameleon',
      img: './images/veiledchameleons.jpg',
      readyToGo: false,
      price: 200,
      qty: 2,
      rating: 5,
      review: ['Difficult to take care of but worth the hassle thanks to their interesting antics and gorgeous colors.']
    },
    {
      species: 'Dogs',
      breed: 'Bullmastiff',
      img: './images/bullmastiffs.jpg',
      readyToGo: true,
      price: 3500,
      qty: 12,
      rating: 4,
      review: ['Docile, sweet, nothing but a gentle giant', 'Hard to train due to stubborness anbd quite drooly, but extremely adoring and loyal. Great with kids']
    }
  ], (err, data)=>{
    res.redirect('/pets');
  });
});

//Link NEW
app.get('/pets/new', (req, res) => {
  res.render('new.ejs');
});

//Link SHOW
app.get('/pets/:id', (req, res) => {
  Pet.findById(req.params.id, (err, foundPet) => {
    res.render('show.ejs', {
      pets: foundPet
    });
  });
});

//Link EDIT
app.get('/pets/:id/edit', (req, res) => {
  Pet.findById(req.params.id, (err, foundPet) => {
    res.render('edit.ejs', {
      pets: foundPet
    });
  });
});

//Define PUT
app.put('/pets/:id', (req, res) => {
  if (req.body.readyToGo === 'on') {
    req.body.readyToGo = true;
  } else {
    req.body.readyToGo = false;
  }
  Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updatePet) => {
    res.redirect('/pets/:id');
  });
});

//Define POST
app.post('/pets', (req, res) => {
  if (req.body.readyToGo === 'on') {
    req.body.readyToGo = true;
  } else {
    req.body.readyToGo = false;
  }
  ///Send created pet to array
  Pet.create(req.body, (err, createdPet) => {
    res.redirect('/pets');
  });
});

//Define DELETE
app.delete('/pets/:id', (req, res) => {
  Pet.findByIdAndRemove(req.params.id, (err, data)=>{
    res.redirect('/pets');
  });
});

//Listener
app.listen(PORT, () => {
  console.log('Listening');
})
