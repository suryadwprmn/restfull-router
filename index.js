const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

// Middleware untuk mengurai data formulir
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk method-override
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/shop_db')
.then((result) => {
    console.log('Terhubung ke Database MongoDB');   
}).catch((err) => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`);
});

app.use('/users',require('./routes/userRoutes'));
  