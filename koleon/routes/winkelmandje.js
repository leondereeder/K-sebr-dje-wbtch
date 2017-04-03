var express = require('express');
var router = express.Router();
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
	
		db.each(makeQuery(), function(err, row) {
			data.push(row);
			console.log(row);
		});
	
		function makeQuery() {
			var staticStr = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS WHERE ProductID = '" + products[0] + "'";
			for (i=1;i<products.length;i++) {
				staticStr += " OR ProductID = '" + products[i] + "'";
			}
			console.log(staticStr);
			return staticStr;
		}
		sendData();

	function sendData() {
		db.close(function(){
			res.setHeader('Content-Type', 'application/json')
			res.send(JSON.stringify(data));
			console.log(JSON.stringify(data));
		});
	}
});

module.exports = router;
