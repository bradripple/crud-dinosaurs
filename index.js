const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
// body-parser middleware
app.use(express.urlencoded({extended: false}));


app.get('/', function(req, res) {
    res.render('home');
});

// lists all dinosaurs
app.get('/dinosaurs', function(req, res) {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
  
    let nameFilter = req.query.nameFilter;
  
    if (nameFilter) {
      dinoData = dinoData.filter(function(dino) {
        return dino.name.toLowerCase() === nameFilter.toLowerCase();
      });
    }
  
    res.render('dinosaurs/index', {myDinos: dinoData});
});

// new dinosaur submit form
app.get('/dinosaurs/new', function(req, res) {
    res.render('dinosaurs/new');
});

app.post('/dinosaurs', function(req, res) {
    console.log(req.body);
})

app.post('/dinosaurs', function(req, res) {
    // read dinosaurs file
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);

    // add item to dinosaurs array
    dinosaurs.push(req.body);

    // save dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));

    // redirect to the GET /dinosaurs route (index);
    res.redirect('/dinosaurs');
});



app.get('/dinosaurs/edit/:idx', function(req, res) {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
});

app.put('/dinosaurs/:idx', function(req, res) {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    // re-assign the name and type fields of the dinosaur to be edited 
    dinoData[req.params.idx].name = req.body.name;
    dinoData[req.params.idx].type = req.body.type;

    // save the edited dinosaurs to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    res.redirect('/dinosaurs');
});

// express show route for dinosaurs (lists one dinosaur)
app.get('/dinosaurs/:idx', function(req, res) {
    // get dinosaurs
    const dinosaurs = fs.readFileSync('./dinosaurs.json');
    const dinoData = JSON.parse(dinosaurs);

    // get array index from url parameter
    const dinoIndex = parseInt(req.params.idx);

    // render page with data of the specified animal
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]})
});

app.delete('/dinosaurs/:idx', function(req, res) {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);

    // remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1);

    // save the new dinosaur to the data.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs');
})

app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
})