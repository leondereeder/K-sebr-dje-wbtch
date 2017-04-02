var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('winkelmandje', { title: 'Winkelmandje' });
});

router.post('/', function(req, res, next) { 
	var data = [];
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	var products = req.body;
	for(i=0;i<products.length;i++) {
		getFromDB(i);
	//	console.log(i);
	}
	function getFromDB(i) {		
		db.each("SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS WHERE ProductID = '" + products[this.i] + "'", function(err, row) {
			data.push(row);
			console.log(data[i]);
	//		console.log(i);
		});
	}
	//console.log("data length: " + data.length);
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify(data));
	db.close();
});

module.exports = router;
