//youtube https://www.youtube.com/watch?v=344Zv2m9TYI&t=1204s
//github https://github.com/LloydJanseVanRensburg/Node-Express-starter
require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();
var path = require('path');
var session = require('express-session');

var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var adddataRouter = require('./routes/adddata');
var alllistRouter = require('./routes/alllist');
var datagetdb2Router = require('./routes/datagetdb2');
var editdataRouter = require('./routes/editdata');
var loginRouter = require('./routes/login');
//var addsampleRouter = require('./routes/add_sampledata');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());


// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware json形式を有効にする。
app.use(express.json()); // parse json bodies in the request object
//下記も必須
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret : 'webslesson',
  cookie : {maxAge : 60000},
  saveUninitialized : false,
  resave : false
}));

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/posts", require("./routes/postRoutes"));

//ルーティング
app.use('/index', indexRouter);
app.use('/adddata', adddataRouter);
app.use('/alllist', alllistRouter);
app.use('/datagetdb2', datagetdb2Router);
app.use('/editdata', editdataRouter);
app.use('/login', loginRouter);

// app.use("/posts", require("./routes/postRoutes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

app.get("/",(req,res) => {
  res.sendFile("./index.html",{
    root: __dirname,
  });
})

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
