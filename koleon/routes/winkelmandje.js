/* 
	Server side javascript file used for the shopping cart page 
 	This files contains several POST and GET handlers to server different requests from the client.
*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

// Get session and render page for user (if user is logged in)
router.get('/', function (req, res, next) {
    console.log("session: " + req.session.userID);
    res.render('winkelmandje', {
        userID: req.session.userID
    });
});

// Handle request to fill shopping cart 
router.post('/cart', function (req, res, next) {
    var data = []; // Containing all query results (thus products)
    var db = new sqlite3.Database('public/protected/db.sqlite3');
    var products = req.body;

    // Query info about all products in cart
    for (i = 0; i < products.length; i++) {
        var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS WHERE ProductID = '" + products[i] + "'";
        db.each(query, function (err, row) {
            data.push(row);
        });
    }
    sendData();

    // Send data of products back to client
    function sendData() {
        db.close(function () {
            // Sort products on price DESC
            data.sort(function (a, b) {
                return b.price - a.price;
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });
    }
});

// Handle request to perform order
router.post('/order', function (req, res, next) {
    var sessionExists = {
        "session": false
    };
    var bestelling = req.body.producten;
    var products = bestelling.split(',');

    if (req.session.userID) { // Only execute order when a buyer is signed in
        var sessionExists = {
            "session": true
        };
        var db = new sqlite3.Database('public/protected/db.sqlite3');
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        // INSERT all products into Orders table and UPDATE their stock
        for (i = 0; i < products.length; i++) {
            var insert = "INSERT INTO Orders(userID,productID,Date) VALUES ('" + req.session.userID + "', '" + products[i] + "', '" + year + "-" + month + "-" + day + "')";
            db.run(insert);
            var update = "UPDATE Products SET Stock = Stock - 1 WHERE productID = '" + products[i] + "'";
            db.run(update);
        }
    }

    // Respond to client if session existed; yes: order done, no: order not executed
    db.close(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(sessionExists));
    });
});

module.exports = router;