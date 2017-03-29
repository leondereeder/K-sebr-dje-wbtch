var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

router.get('/', function(req, res, next) {
  res.render('producten', { title: 'Producten' });
});

router.post('/', function(req, res, next) {
	loadDB();
});
module.exports = router;

function loadDB() {
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	// DB logic
	db.each("SELECT product_name AS productName, price AS price, image AS imageString FROM Product", function(err, row) {
		
	});
	db.close();
}