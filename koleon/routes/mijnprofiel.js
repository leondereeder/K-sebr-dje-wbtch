var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
		console.log("session: " + req.session.userID);
  res.render('mijnprofiel', { userID : req.session.userID });
});

module.exports = router;