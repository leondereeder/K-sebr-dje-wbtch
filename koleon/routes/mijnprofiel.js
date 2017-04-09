var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

router.get('/', function(req, res, next) {
		console.log("session: " + req.session.userID);
  res.render('mijnprofiel', { userID : 1
  //req.session.userID 
  });
});

module.exports = router;

router.post('/', function(req, res, next) {
	// Get Parameters from page
	var userID = req.body;

	var queryAccount = "SELECT UserName AS userName, Usertype AS userType, FirstName AS firstName, LastName AS lastName, Adress AS address, PostalCode AS postalCode FROM USERS WHERE UserID = " + userID;
	var queryOrders = "SELECT O.OrderID AS orderID, P.ProductID AS productID, P.ProductName AS productName, O.Date AS date FROM USERS AS U INNER JOIN ORDERS AS O ON U.UserID=O.UserID INNER JOIN PRODUCTS AS P ON O.ProductID=P.ProductID WHERE U.UserID="+userID;
		
	var data = [];
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	// DB logic
	db.each(queryAccount, function(err, row) {
		data.push(row);
	});
	db.each(queryOrders, function(err,row) {
		data.push(row);
		console.log(row);
	});
	sendData();


	function sendData() {
		db.close(function(){
			res.setHeader('Content-Type', 'application/json')
			res.send(JSON.stringify(data));
		});
	}
});