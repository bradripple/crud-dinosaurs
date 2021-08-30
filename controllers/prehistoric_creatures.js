const express = require('express');
const router = express.Router();
const fs = require('fs');


router.get('/', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesData = JSON.parse(creatures);
    
    let nameFilter = req.query.nameFilter;
    
    if (nameFilter) {
        creaturesData = creaturesData.filter(function(creature) {
            return creature.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }
    
    res.render('prehistoric_creatures/index', {myCreatures: creaturesData});
});

router.get('/new', function(req, res) {
    res.render('prehistoric_creatures/new');
});

router.get('/:idx', function(req, res) {
    // get prehistoric_creatures
    const creatures = fs.readFileSync('./prehistoric_creatures.json');
    const creaturesData = JSON.parse(creatures);
    
    // get array index from url parameter
    const creaturesIndex = parseInt(req.params.idx);
    
    // render page with data of the specified animal
    res.render('prehistoric_creatures/show', { myCreatures: creaturesData[creaturesIndex]})
});

router.post('/', function(req, res) {
    console.log(req.body);
})

router.post('/', function(req, res) {
    // read prehistoric_creatures file
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    creatures = JSON.parse(creatures);
    
    // add item to creatures array
    creatures.push(req.body);
    
    // save creatures to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatures));
    
    // redirect to the GET /prehistoric_creatures route (index);
    res.redirect('/prehistoric_creatures');
});

router.get('/edit/:idx', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesData = JSON.parse(creatures);
    res.render('prehistoric_creatures/edit', { myCreatures: creaturesData[req.params.idx], creaturesId: req.params.idx});
});


router.delete('/:idx', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesData = JSON.parse(creatures);

    // remove the deleted creature from the creatures array
    creaturesData.splice(req.params.idx, 1);

    // save the new creature to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData));

    // redirect to the GET /prehistoric_creatures route (index)
    res.redirect('/prehistoric_creatures');
})

router.put('/:idx', function(req, res) {
    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesData = JSON.parse(creatures);

    // re-assign the type and img_url fields of the creature to be edited 
    creaturesData[req.params.idx].type = req.body.name;
    creaturesData[req.params.idx].img_url = req.body.type;

    // save the edited creature to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData));
    res.redirect('/prehistoric_creatures');
});


module.exports = router;