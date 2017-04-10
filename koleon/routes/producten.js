/*
	This file handles the routing for producten
	It mainly recieves a variable, uses it to generate a query,
	queries the database and sends the result back
*/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

router.get('/', function (req, res, next) {
    console.log("session: " + req.session.userID);
    res.render('producten', {
        userID: req.session.userID
    });
});

module.exports = router;

//this function's main goal is to extract data from the database and send it back to the client. it uses the object send from producten.js
// and according to values in the object a query will be formed
router.post('/', function (req, res, next) {
    // Get Parameters from page
    var pageNr = req.body[0];
    var sort = req.body[1];
    var filter = req.body[2];
    var searchFor = req.body[3];

    var startProducts = ((pageNr - 1) * 12);
    var isEmpty = true;
    var endProducts = pageNr * 12;

    //check if filter is empty
    for (i = 0; i < filter.length; i++) {
        if (filter[i] == 0 || filter[i] == '0') {

        } else {
            isEmpty = false;
        }
    }
	
    //if no filters were selected, use the standard query
    if (isEmpty == true) {
        var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID ";
        if (typeof searchFor !== "undefined" && searchFor !== "") {
            query += "WHERE productName LIKE '%" + searchFor + "%'";
        }
		query += "AND Stock > 0";
        query = query + " ORDER BY " + sort;
    } else {
        var query = generateFilteringQuery(sort, filter, searchFor);
    }

    var data = [];
    var db = new sqlite3.Database('public/protected/db.sqlite3');
    // DB logic
    db.each(query, function (err, row) {
        data.push(row);
    });
    sendData();


    function sendData() {
        db.close(function () {
            var total = data.length;
            data = data.slice(startProducts, endProducts);
            data.push(total);
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(data));
        });
    }
});

/*
	this function generates a query. It will split the array into three new arrays. Using the start of the variable query it will add new SQL syntax using 
	several for loops. there are several boolean variables to check which syntax to use
*/
function generateFilteringQuery(sort, filter, searchFor) {
    var categories = filter.splice(0, 3);
    var merken = filter.splice(0, 8);
    var subcategories = filter.splice(0, 14);

    // Remove all empty values from array
    Array.prototype.remove = function () {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    categories.remove('0');
    merken.remove('0');
    subcategories.remove('0');

    // The base query
    var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID WHERE ";

    // Check if it is the first value in the query
    var first = false;

    // For loop for main categories
    for (i = 0; i < categories.length; i++) {
        // If it's the first value in the query, do an extra (
        if (i == 0 && first == false) {
            query += "((CategoryName='" + categories[i] + "' ";
            first = true;
        } else {
            query += "OR CategoryName='" + categories[i] + "' ";
        }
        // At the end of all main categories, close it
        if (i == categories.length - 1) {
            query += ") ";
        }
    }

    // For loop for subcategories
    var firstSubcategory = true;
    for (i = 0; i < subcategories.length; i++) {
        // If it's the first value in the query and the first value in the for loop, do an extra (
        if (i == 0 && first == false) {
            query += "(((SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
            first = true;
            firstSubcategory = false;
        }
        // If it's the first value in the loop but not in the query, say AND
        else if (firstSubcategory) {
            query += "AND ((SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
            firstSubcategory = false;
        } else {
            query += "OR (SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
        }
        // At the end of the loop, close it
        if (i == subcategories.length - 1) {
            query += ") ";
        }
    }

    // For loop for brands
    var firstMerk = true;
    for (i = 0; i < merken.length; i++) {
        // If it's the first value in the query and the first value in the for loop, do an extra (
        if (i == 0 && first == false) {
            query += "((ManufacturerName='" + merken[i] + "' ";
            firstMerk = false;
        }
        // If it's the first value in the loop but not in the query, say AND
        else if (firstMerk) {
            query += "AND (ManufacturerName='" + merken[i] + "' ";
            firstMerk = false;
        } else {
            query += "OR ManufacturerName='" + merken[i] + "' ";
        }
        // At the end of the loop, close it
        if (i == merken.length - 1) {
            query += ") ";
        }
    }
    // Close the filter options
    query += ") ";

    //if the user searches using the search bar the query will be different. it will use SQL's LIKE statement 
    if (typeof searchFor !== "undefined") {
        query += "AND productName LIKE '%" + searchFor + "%'";
    }

    //the query always ends with order by + the selected way of ordering
    query = query + " ORDER BY " + sort;

    return query;
}