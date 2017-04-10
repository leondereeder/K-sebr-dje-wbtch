var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose()

router.get('/', function(req, res, next) {
		console.log("session: " + req.session.userID);
  res.render('producten', { userID : req.session.userID });
});

module.exports = router;

router.post('/', function(req, res, next) {
	// Get Parameters from page
	var pageNr = req.body[0];
	var sort = req.body[1];
	var filter = req.body[2];
	var searchFor = req.body[3];

	var startProducts = ((pageNr-1)*12);
	var isEmpty = true;
	var endProducts = pageNr * 12;
	
	//check if filter is empty
	for(i=0;i<filter.length;i++) {
		if(filter[i]==0 || filter[i]=='0') {
			
		}
		else {
			isEmpty = false;
		}	
	}
	if(isEmpty == true) {
		var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID ";
		if (typeof searchFor !== "undefined" && searchFor !== "") {
			query += "WHERE productName LIKE '%" + searchFor + "%'";
			query += "AND Stock > 0";
		}
		query = query + " ORDER BY " + sort;
		console.log(query);
	}
	else {
		var query = generateFilteringQuery(sort, filter, searchFor);
	}
		
	var data = [];
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	// DB logic
	db.each(query, function(err, row) {
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

function generateFilteringQuery(sort, filter, searchFor) {
	var categories = filter.splice(0,3);
	var merken = filter.splice(0,8);
	var subcategories = filter.splice(0, 14);
	
	Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
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
	
	var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID WHERE ";
	
	var first = false;
	
	for(i=0;i<categories.length;i++){
		if (i==0 && first==false) {
			query += "((CategoryName='" + categories[i] + "' ";
			first = true;
		}
		else {
			query += "OR CategoryName='" + categories[i] + "' ";
		}
		if(i==categories.length -1) {
			query += ") ";
		}
	}
	
	var firstSubcategory = true;
	for(i=0;i<subcategories.length;i++){
		if (i==0 && first == false) {
			query += "(((SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
			first = true;
			firstSubcategory = false;
		}
		else if (firstSubcategory) {
			query += "AND ((SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
			firstSubcategory = false;
		}
		else {
			query += "OR (SCG.SubCategoryName='" + subcategories[i] + "' OR SCG2.SubCategoryName='" + subcategories[i] + "') ";
		}
		if(i==subcategories.length -1) {
			query += ") ";
		}
	}
	
	var firstMerk = true;
	for(i=0;i<merken.length;i++){
		if (i==0 && first == false) {
			query += "((ManufacturerName='" + merken[i] + "' ";
			firstMerk = false;
		}
		else if(firstMerk){
			query += "AND (ManufacturerName='" + merken[i] + "' ";
			firstMerk = false;
		}
		else {
			query += "OR ManufacturerName='" + merken[i] + "' ";
		}
		if(i==merken.length -1) {
			query += ") ";
		}
	}
	query += ") ";

	if(typeof searchFor !== "undefined") {
		query += "LIKE '%" + searchFor + "%'";
	}
	
	query = query + " ORDER BY " + sort;

	console.log(query);
	return query;
}