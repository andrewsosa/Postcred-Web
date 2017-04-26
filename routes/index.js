var express = require('express');
var router  = express.Router();

var request = require('request');

const storage = require('@google-cloud/storage');

const client = storage({
  projectId: 'postcred-df5cf'
});

const bucketName = 'postcred-df5cf.appspot.com';
const bucket = client.bucket(bucketName);

const dbURL   = 'https://postcred-df5cf.firebaseio.com/movies.json';

// Default app page
router.get('/', (req, res, next) => {

  // query movies on firebase
  request(dbURL, (err, response, body) => {
    if(err) {
      console.log(err);
    }
    else {
      let movies = JSON.parse(body);
      res.render('index', {movies: movies});
    }

  });
});

// Get poster reference
router.get('/images/:filename', (req, res, next) => {

  let filename = req.params.filename;
  bucket.file('images/' + filename).download().then(data => {
    res.end(data[0], 'binary');
  });

  // var remoteReadStream = bucket.file('giraffe.jpg').createReadStream();
  // var localWriteStream = fs.createWriteStream('/photos/zoo/giraffe.jpg');
  // remoteReadStream.pipe(localWriteStream);

});

module.exports = router;
