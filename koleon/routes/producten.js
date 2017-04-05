var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var data = [];

router.get('/', function(req, res, next) {
	loadDB();
  res.render('producten', { products: data });
});

module.exports = router;

function loadDB() {
	var x = data.length;
	if (x==0) {
		var db = new sqlite3.Database('public/protected/db.sqlite3');
		// DB logic
		db.each("SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS", function(err, row) {
			data.push(row);
			console.log(data[x]);
		});
		console.log(data.length);
		db.close();
	}
}