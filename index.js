const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));
// body-parser middleware
app.use(express.urlencoded({extended: false}));




app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
})