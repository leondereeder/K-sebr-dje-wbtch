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
	var pageNr = req.body[0];
	var sort = req.body[1];
	var filter = req.body[2];
	var searchFor = req.body[3];

	var startProducts = ((pageNr-1)*12);
	var isEmpty = true;
	var endProducts = pageNr * 12;
	
	//check if filter is empty
	for(i=0;i<filter.length;i++) {
		if(filter[i]==0 || filter[i]=="0") {
			
		}
		else {
			isEmpty = false;
		}	
	}
	if(isEmpty == true) {
		var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID ";
		if (typeof searchFor !== "undefined") {
			query += "WHERE productName LIKE '%" + searchFor + "%'";
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
	first = true;
	console.log("succes");
	
	var query = "SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS AS P INNER JOIN CATEGORIES AS CG ON P.CategoryID=CG.CategoryID INNER JOIN SUBCATEGORIES AS SCG ON P.SubCategoryID=SCG.SubCategoryID INNER JOIN SUBCATEGORIES AS SCG2 ON P.SubCategory2ID=SCG2.SubCategoryID INNER JOIN MANUFACTURERS AS M ON P.ManufacturerID=M.ManufacturerID WHERE ";
	for(var i =0; i < filter.length; i++)
	{
		if(i >= 3 && i <= 9 && filter[i] != '0' && first == true)
		{
			query = query + "ManufacturerName='" + filter[i] + "' ";
			first = false;
		}
		else if(i >= 3 && i <= 9 && filter[i] != '0' && first == false)	//filter manufacturers
		{
			query = query + "AND ManufacturerName='" + filter[i] + "' ";
			
		}
		else if(i>=10 && i <= 12 && filter[i] != '0' && first == true)	//filter op categorie
		{
			query = query + "CategoryName='" + filter[i] + "' ";
			first = false;
		}
		else if(i>=10 && i <= 12 && filter[i] != '0' && first == false)	//filter op categorie
		{
			query = query + "OR CategoryName='" + filter[i] + "' ";
		}
		else if((i <= 2 || i >= 13) && filter[i] != '0' && first ==  true)	//filter op categorie
		{
			query = query + "(SCG.SubCategoryName='" + filter[i] + "' OR SCG2.SubCategoryName='" + filter[i] + "') ";
			first = false;
		}
		else if ((i <= 2 || i >= 13) && filter[i] != '0' && first == false)	//filter op subcategory
		{
			query = query + "OR (SCG.SubCategoryName='" + filter[i] + "' OR SCG2.SubCategoryName='" + filter[i] + "') ";
		}
	}
	if(typeof searchFor !== "undefined") {
		query += "LIKE %" + searchFor + "%";
	}
	query = query + " ORDER BY " + sort;
	console.log(query);
	return query;
}