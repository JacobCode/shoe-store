const mongoose = require('mongoose');
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.disable('x-powered-by');
app.enable("trust proxy");

const Store = require('./models/store');
const db = process.env.DB;
mongoose.connect(db, {useNewUrlParser: true })
    .then(() => {
        console.log('✅ MONGO DB CONNECTED');
    })
    .catch(() => {
        console.log('🛑 MONGO DB ERROR');
	});
	
// All Shoes (GET)
app.get('/api/all', (req, res) => {
	Store.find()
		.then(shoes =>  { res.json(shoes); console.log(shoes); });
});

// Search Shoes (GET)
app.get('/api/search/:brand/:gender/:price', (req, res) => {
	var price = req.params.price;
    var brand = req.params.brand !== 'All' ? req.params.brand.charAt(0).toUpperCase() + req.params.brand.slice(1) : ['Nike', 'Adidas', 'Jordan', 'Vans'];
    var gender = req.params.gender !== 'All' ? req.params.gender.charAt(0).toUpperCase() + req.params.gender.slice(1) : ['Men', 'Women'];
    Store.find({ brand: brand, gender: gender })
        .then(shoes => res.json(shoes.filter((s) => s.price <= price)));
});


app.listen(process.env.PORT || 3001, () => console.log('\x1b[32m', `Server running on port ${process.env.PORT|| 3001}`));