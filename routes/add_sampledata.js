var express = require('express');

var router = express.Router();

const database = require('../config/db');

router.post("/", (req, res, next) =>{
    //res.render('add_sampledata',{title: 'add_sampledata'});
    var first_name = req.body.first_name;

	var last_name = req.body.last_name;

	var age = req.body.age;

	var gender = req.body.gender;

	var query = `
	INSERT INTO sample_data 
	(first_name, last_name, age, gender) 
	VALUES ("${first_name}", "${last_name}", "${age}", "${gender}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			//req.flash('success', 'Sample Data Inserted');
			res.redirect("/alllist");
		}

	});
});

module.exports = router;