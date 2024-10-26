const express = require('express');

const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(flash());
router.use(session({
    secret : 'webslesson',
    cookie : {maxAge : 60000},
    saveUninitialized : false,
    resave : false
  }));

const database = require('../config/db');

router.get("/:id", function(request, response, next){
	response.render('index',{title:'アクセス不可'});
});

router.get("/", function(request, response, next){
	var id = request.params.id;
	// if(id == '123'){
		const query = "SELECT * FROM sample_data ORDER BY id DESC";

		database.query(query, function(error, data){
	
			if(error)
			{
				throw error; 
			}
			else
			{
				//console.log(data);
				response.render('alllist', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:data, message:request.flash('success')});
			}
	
		});
	// }else{
	// 	response.render('index',{title:'アクセス不可'});
	// }


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
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/alllist");
		}

	});

});

module.exports = router;