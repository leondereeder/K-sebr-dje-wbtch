var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

router.get('/', function(req, res, next) {
  res.render('producten');
});

module.exports = router;

router.post('/', function(req, res, next) {
	// Get Parameters from page
	var settings = req.body;
	var startProducts = (((settings[0])-1)*12);
	var endProducts = settings[0] * 12;
	
	var data = [];
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	// DB logic
	db.each("SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS ORDER BY Price ASC", function(err, row) {
		data.push(row);
	});
	sendData();


	function sendData() {
		db.close(function(){
			var total = data.length;
			data = data.slice(startProducts, endProducts);
			data.push(total);
			res.setHeader('Content-Type', 'application/json')
			res.send(JSON.stringify(data));
		});
	}
});
