var express = require('express');
var router = express.Router();

var request = require('request');

const url = 'https://postcred-df5cf.firebaseio.com/movies.json';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Default app page
router.get('/movies', (req, res, next) => {
  // query movies on firebase
  request(url, (err, response, body) => {
    if(err) {
      console.log(err);
    }
    else res.send(body);
  });
});

module.exports = router;
