var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var data;

var index = require('./routes/index');
var winkelmandje = require('./routes/winkelmandje');
var contact = require('./routes/contact');
var diensten = require('./routes/diensten');
var overons = require('./routes/overons');
var producten = require('./routes/producten');

// view engine setup
app.set('views', path.join(__dirname, 'views'));	
app.set('view engine', 'jade');

function isUserAllowed(req, res) {
	// False is forbidden
	return false;
}

app.use('/protected/*', function(req, res, next){
	var allowed = isUserAllowed(req, res);
	if (allowed) {
		next();
	}
	else {
		res.status(403).send('Error 403. Access forbidden');
		res.end();
	}
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/index.html', function(req, res, next) {
	var db = new sqlite3.Database('public/protected/db.sqlite3');
	// DB logic
	db.each("SELECT UserName AS userName, Password AS password, FirstName AS firstName, LastName AS lastName FROM USERS WHERE UserName = '" + req.body.username + "' AND Password = '" + req.body.password + "'", function(err, row) {
		var data = row;
		console.log(row);
	});
	if (data != null) {
		next();
	}
	else {
		res.end('It worked');
	}
});

app.post('/winkelmandje.html', function(req, res, next) {
	var x = data.length;
	console.log("works");
	if (x==0) {
		var db = new sqlite3.Database('public/protected/db.sqlite3');
		var products = [];
		products = req.body.data;
		for(i=0;i<products.length;i++) {
			db.each("SELECT ProductID AS productID, ProductName AS productName, Description AS description, Stock AS stock, Price AS price, Image as image FROM PRODUCTS WHERE ProductID = '" + products[i] + "'", function(err, row) {
				data.push(row);
				console.log(data[x]);
			});
		}
		console.log(data.length);
		db.close();
	}
	res.status(200);
	res.write(data);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/index.html', index);
app.use('/winkelmandje.html', winkelmandje);
app.use('/contact.html', contact);
app.use('/diensten.html', diensten);
app.use('/overons.html', overons);
app.use('/producten.html', producten);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(8099);