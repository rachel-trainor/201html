var express = require('express');
var router = express.Router();

var quotes = [
  { author : 'Gordon B. Hinckley', text : "You have not failed until you quit trying"},
  { author : 'Henry B. Eyring', text : "If you are on the right path it wull always be uphill"},
  { author : 'David A. Bednar', text : "If today you are a little better than you were yesterday, then that's enough"},
  { author : 'Gordon B. Hinckley', text : "You will come to know that what appears today to be a sacrifice will prove instead to be the greatest investment that you will ever make"},
  { author : 'Neal A. Maxwell', text : "Faith in God includes faith in His timing"},
  { author : 'Dieter F. Uchtdorf', text : "There are times when we have to step into the darkness in faith, confident that God will place solid ground beneath our feet once we do"}

];

router.get('/', function(req, res, next) {
  res.sendFile('ca.html', { root: 'public' });
});

router.get('/quotes', function(req, res) {
  res.json(quotes);
});

router.get('/quote/random', function(req, res) {
  var id = Math.floor(Math.random() * quotes.length);
  var q = quotes[id];
  console.log(q);
  res.json(q);
});

router.get('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  var q = quotes[req.params.id];
  res.json(q);
});

router.post('/quote', function(req, res) {

console.log(req.body);

  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(true);
});

router.delete('/quote/:id', function(req, res) {
  console.log(req.params.id);
  var index = Number(req.params.id);
  if(quotes.length <= index) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  console.log("the index is", index);
  quotes.splice(index, 1);
  console.log("Second Time", quotes);

  res.json(true);
});


module.exports = router;
