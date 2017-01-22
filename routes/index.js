var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Leveranciers = mongoose.model('Leverancier');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"Handleiding":"REST service voor metingapp"})
});

router.get ('/api', function(req, res) {
  res.json({"GET /api/leveranciers":"Vraagt alle leveranciers op, met bijhorende abonnementen",
  "POST /api/leveranciers": "String naam en String website als POST"})
});

router.get('/api/leveranciers', function(req,res) {
  Leveranciers.find({},{_id: 0}, function(err,leveranciers) {
    if(err) {res.json({"error": err})}
    res.json(leveranciers)
  })
});

router.post('/api/leveranciers', function(req, res) {
  var naam = req.body.naam;
  var website = req.body.website;
  Leveranciers.find({}).sort({id: -1}).limit(1).exec(function(err, maxResult) {
    var maxId = maxResult.id !== null ? maxResult.id : 0;
    var naam = req.body.naam;
    var website = req.body.website;

    var nieuweLeverancier = new Leveranciers();
    nieuweLeverancier.naam = naam;
    nieuweLeverancier.website = website;
    nieuweLeverancier.id = maxId + 1;
    nieuweLeverancier.save(function(err) {
      if(err) { console.log(err) }
      res.json({"confirmation": "Leverancier added"})
    })
  })
});

router.get('/api/leveranciers/:id', function(req,res) {

  var levId = req.params.id;

  Leveranciers.findOne({"id": levId}, function(err,leverancier) {
    if(err) {res.json({"error": err})}
    res.json(leverancier.tariefplannen)
  })
});

router.post('/api/leverancier/:id', function(req,res) {
  var levId = req.params.id;

  Leveranciers.find({"id":levId}, function(err, lev) {
    var isGroen = req.body.groen;
    var extraVoorwaarden = req.body.voorwaarden;
    var naam = req.body.naam;
    var basisprijs = req.body.basisprijs;

    var selectedId;

    if ( lev.tariefplannen !== null ) {
      selectedId = lev.tariefplannen[lev.tariefplannen.length - 1].id
    }
    Leveranciers.findOneAndUpdate(levId, {$push: {"tariefplannen": {groen: isGroen,
      extraVoorwaarden: extraVoorwaarden, naam: naam, basisprijs: basisprijs, id: selectedId }}})
  })



})

module.exports = router;
