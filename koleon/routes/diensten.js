/*
	This file is used for routing on the 'Laptop Samenstellen' page
*/
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log("session: " + req.session.userID);
    res.render('diensten', {
        userID: req.session.userID
    });
});

module.exports = router;