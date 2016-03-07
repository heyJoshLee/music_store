var path = require("path"),
    fs = require("fs"),
    file_path = path.resolve(path.dirname(__dirname), "data/albums.json");


function getAlbums() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function nextId() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id + 1;
}

function writeAlbums(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

module.exports = function(router) {
  router.post("/albums", function(req, res) {
    var album = req.body,
        albums = getAlbums();

    album.id  = nextId();
    albums.push(album);
    writeAlbums({ last_id: album.id, data: albums });
    res.json(album);
  });

  router.get("/albums/new", function(req, res) {
    res.render("new");
  });
};
