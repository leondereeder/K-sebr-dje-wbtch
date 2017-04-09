var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var multer  = require('multer');
var path = require('path');
var storage = multer.diskStorage({
	destination: path.join(__dirname, '../public/images/products'),
	filename: function (req, file, cb) {
      cb(null, file.originalname)
	}
})
var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
		console.log("session: " + req.session.userID);
  res.render('mijnprofiel', { userID : req.session.userID });
});

module.exports = router;

router.post('/', upload.single('image'), function(req, res, next) {
	// Get Parameters from page
	if(typeof req.body.productName !== "undefined") {
		var productName = req.body.productName;
		var description = req.body.description;
		var stock = req.body.stock;
		var sellerID = req.body.sellerID;
		var manufacturer = req.body.manufacturer;
		var category = req.body.category;
		var subcategory = req.body.subcategory;
		var subcategory2 = req.body.subcategory2;
		if(subcategory === "NULL") {
			subcategory = "''";
		}
		if(subcategory2 === "NULL") {
			subcategory2 = "''";
		}
		var price = req.body.price;
		
		
		var query = "INSERT INTO PRODUCTS VALUES('" + productName + "', '" + productName + "', '" + description + "', " + stock + ", " + sellerID + ", " + manufacturer + ", " + category + ", " + subcategory + ", " + subcategory2 + ", " + price + ", '" + req.file.originalname + "' )";
		
		var data = [];
		var db = new sqlite3.Database('public/protected/db.sqlite3');
		
		db.run(query);
		
		db.close(function(err) {
		res.render('mijnprofiel', { userID : req.session.userID, productAdded : true });
		});
	}
	else {
		var userID = req.body;

		var queryAccount = "SELECT UserID AS userID, UserName AS userName, Usertype AS userType, FirstName AS firstName, LastName AS lastName, Adress AS address, PostalCode AS postalCode FROM USERS WHERE UserID = " + userID;
		var queryOrders = "SELECT O.userID AS userID, P.ProductID AS productID, P.ProductName AS productName, O.Date AS date, P.Description AS description, P.Image AS image, P.Price AS price, P.SellerID AS sellerID, P.Stock AS stock FROM PRODUCTS AS P INNER JOIN ORDERS AS O ON O.ProductID=P.ProductID INNER JOIN USERS AS U ON O.UserID=U.UserID WHERE U.UserID="+userID+" OR P.SellerID="+userID;
			
		var data = [];
		var db = new sqlite3.Database('public/protected/db.sqlite3');
		// DB logic
		db.each(queryAccount, function(err, row) {
			data.push(row);
			getOrders();
		});
		function getOrders() {
			db.each(queryOrders, function(err,row) {
				data.push(row);
			});
		}
		sendData();


		function sendData() {
			db.close(function(){
				res.setHeader('Content-Type', 'application/json')
				res.send(JSON.stringify(data));
			});
		}
	}
});