var express = require('express'),
  path = require("path"),
  fs = require("fs"),
  file_path = path.resolve(path.dirname(__dirname), "data/albums.json"),
  router = express.Router();

function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8"));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    albums: getAlbums()
  });
});

module.exports = router;
