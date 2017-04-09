var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

router.get('/', function(req, res, next) {
		console.log("session: " + req.session.userID);
  res.render('winkelmandje', { userID : req.session.userID });
});

router.post('/cart', function(req, res, next) { 
	var data = [];
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	var products = req.body;
		db.each(makeQuery(), function(err, row) {
			data.push(row);
		});
	
		function makeQuery() {
			var staticStr = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS WHERE ProductID = '" + products[0] + "'";
			for (i=1;i<products.length;i++) {
				staticStr += " OR ProductID = '" + products[i] + "'";
			}
			return staticStr;
		}
		sendData();

	function sendData() {
		db.close(function(){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(data));
		});
	}
});

router.post('/order', function(req, res, next) {
	var sessionExists = {"session":false};
	var bestelling = req.body.producten;
	var products = bestelling.split(',');
	
	if(req.session.userID) { // Only execute order when a buyer is signed in
		var sessionExists = {"session":true};
		var db = new sqlite3.Database('public/protected/db.sqlite3');
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		
		for (i=0;i<products.length;i++) {
			var insert = "INSERT INTO Orders(userID,productID,Date) VALUES ('" + req.session.userID + "', '" + products[i] + "', '" + year + "-" + month + "-" + day + "')";
			db.run(insert);
			console.log(insert);
			var update = "UPDATE Products SET Stock = Stock - 1 WHERE productID = '" + products[i] + "'";
			db.run(update);
			console.log('Ordered: ' + products[i]);
		}
	}

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(sessionExists));
});
	
module.exports = router;
