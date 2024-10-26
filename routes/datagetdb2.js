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

const pool = require('../config/db2');

// router.get('/', function(req, res, next) {
//     res.send('datagetdb2');
//     // console.log("datagetdb2");
//     // res.render('datagetdb2', { title: 'Express' });
//   });
  

// データの取得
router.get("/", (req, res) => {
    //res.send('<h3>aaaaa</h3>');
sql = "SELECT * FROM sample_data";

const query = sql;
pool.query(query, (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error retrieving data from database");
  } else {
    res.status(200);
    res.render('datagetdb2', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:result, message:req.flash('success')});
  }
});
});
// pool.execute(sql, function (err, result){
//     if(err) throw err;
//     result.forEach((res) => {
//         console.log(res.first_name);
//     });
//     //console.log(result);
//     result.forEach((res) => {
//         console.log(res.first_name);
//     })
// });
module.exports = router;