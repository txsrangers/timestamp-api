var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

//new route
//time is a URL parameter. Anything after the forward slash can be captured in the request
router.get('/:time', function(req, res) {

	//function to convert UNIX to Natural:
	function unixToNatural(unixtime) {
		//unix converts to miliseconds, and Date() uses seconds, so you have to convert
		var date = new Date(unixtime * 1000);
		//build the Natural date string:
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		//getMonth() returns a number from 0 - 11 for the month
		var month = months[date.getMonth()];
		//getDate() returns a number 1 - 31 for the day of the month
		var day = date.getDate();
		var year = date.getFullYear();

		return month + ' ' + day + ', ' + year;


	}
	//check for UNIX or natural timestamp:
	if(!isNaN(req.params.time)) {
		//it's just a number, so it's UNIX, & needs to be converted to natural:
		var result = unixToNatural(req.params.time);
		var data = { unix: req.params.time, natural: result}; 
		res.json(data);
	} else {
		var natural = new Date(req.params.time) //the date object converts to miliseconds
		//if Date() object failed to convert, input is invalid, and it will be null
		if(!isNaN(natural)) {
			//convert to unix first:
			var unix = natural / 1000;
			//build the JSON object:
			var data = { unix: unix, natural: req.params.time };
			res.json(data);
		} else {
			res.json({ unix: null, natural: null })
		}
	} 

});


	//Other ways of responding:

	//just display in a new page:
	//res.send(req.params.time)

	//display in the index.jade view:    
	//res.render('index', { time: req.params.time});  

	//respond with an object of JSON data:
	//var data  = { time: req.params.time };
	//res.json(data);  

module.exports = router;
