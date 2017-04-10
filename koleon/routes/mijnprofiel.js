/* 
	Server side javascript file used for the profile page.
 	This files contains several POST and GET handlers to server different requests from the client.
	Mostly this contains reading and processing received data and sending back some new data.
*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({ // Set location to upload images
    destination: path.join(__dirname, '../public/images/products'),
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
});

router.get('/', function (req, res, next) {
    console.log("session: " + req.session.userID);
    res.render('mijnprofiel', {
        userID: req.session.userID
    });
});

module.exports = router;

// POST handler to process the image upload and add a new product to the database
router.post('/', upload.single('image'), function (req, res, next) {
    // Get Parameters from page if defined
    if (typeof req.body.productName !== "undefined") {
        var productName = req.body.productName;
        var description = req.body.description;
        var stock = req.body.stock;
        var sellerID = req.body.sellerID;
        var manufacturer = req.body.manufacturer;
        var category = req.body.category;
        var subcategory = req.body.subcategory;
        var subcategory2 = req.body.subcategory2;
        if (subcategory === "NULL") {
            subcategory = "''";
        }
        if (subcategory2 === "NULL") {
            subcategory2 = "''";
        }
        var price = req.body.price;


        var query = "INSERT INTO PRODUCTS VALUES('" + productName + "', '" + productName + "', '" + description + "', " + stock + ", " + sellerID + ", " + manufacturer + ", " + category + ", " + subcategory + ", " + subcategory2 + ", " + price + ", '" + req.file.originalname + "' )";

        var data = [];
        var db = new sqlite3.Database('public/protected/db.sqlite3');

        db.run(query);

        db.close(function (err) {
            res.render('mijnprofiel', {
                userID: req.session.userID,
                productAdded: true
            });
        });
    }
    // If no parameters defined, this post request is used by the client to fill the different Product tables on the profile page
    else {
        var userID = req.body;

        var queryAccount = "SELECT UserID AS userID, UserName AS userName, Usertype AS userType, FirstName AS firstName, LastName AS lastName, Adress AS address, PostalCode AS postalCode FROM USERS WHERE UserID = " + userID;
        var queryOrders = "SELECT O.userID AS userID, P.ProductID AS productID, P.ProductName AS productName, O.Date AS date, P.Description AS description, P.Image AS image, P.Price AS price, P.SellerID AS sellerID, P.Stock AS stock FROM PRODUCTS AS P INNER JOIN ORDERS AS O ON O.ProductID=P.ProductID INNER JOIN USERS AS U ON O.UserID=U.UserID WHERE U.UserID=" + userID + " OR P.SellerID=" + userID;
        var queryAvailableProducts = "SELECT SellerID AS id, productName AS productName, Description AS description, Price AS price, Stock AS stock, Description AS description, Image AS image FROM Products WHERE Stock > 0 AND SellerID = " + userID;

        var data = [];
        var db = new sqlite3.Database('public/protected/db.sqlite3');
        // DB logic
        db.each(queryAccount, function (err, row) {
            data.push(row);
            getOrders();
        });

        function getOrders() {
            db.each(queryOrders, function (err, row) {
                data.push(row);
            });
            getAvailableProducts();
        }

        function getAvailableProducts() {
            db.each(queryAvailableProducts, function (err, row) {
                data.push(row);
            });
        }
        sendData();


        function sendData() {
            db.close(function () {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(data));
            });
        }
    }
});

// POST handler to handle the editing of a profile. Updates database accordingly
router.post('/edit', function (req, res, next) {
    var user = req.body;
    var address = req.body[3].split(" ")[0];
    console.log(address);
    var postalCode = req.body[3].split(" ")[1];
    console.log(postalCode);
    var query = "UPDATE USERS SET UserName = '" + user[0] + "', UserType = '" + user[4] + "', FirstName = '" + user[1] + "', LastName = '" + user[2] + "', Adress = '" + address + "', PostalCode = '" + postalCode + "' WHERE UserID = " + req.session.userID;
    console.log(query);
    var data = [];
    var db = new sqlite3.Database('public/protected/db.sqlite3');
    db.run(query);
    db.close(function () {
        res.render('mijnprofiel', {
            userID: req.session.userID
        });
    });
});