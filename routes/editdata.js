var express = require('express');
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
const database = require('../config/db');

/* GET home page. https://www.youtube.com/watch?v=SnncAvMYxgY */
router.get('/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

	database.query(query, function(error, data){
		//console.log(data[0]['first_name']);
		response.render('editdata', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/:id', async (request, response, next) => {

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

    var password = request.body.password;
    var hashed_password = await bcrypt.hashSync(password, 10);
	//let hashedPassword = await bcrypt.hash(password, 10);

	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}",
    password = "${hashed_password}"
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Updated');
			response.redirect('/alllist');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			//request.flash('success', 'Sample Data Deleted');
			response.redirect("/alllist");
		}

	});

});


module.exports = router;