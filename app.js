var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// ethereum contracts
// var truffle = require('./app/javascripts/app.js');

// var Senpai = artifacts.require("./Senpai.sol");
/*
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var web3 = new Web3(App.web3Provider);

console.log(App);
*/

var app = express();
app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// 소스 게시하기
app.get('/form', function(req,res){
  res.render('form');
});
/*
app.post('/form_receiver', function(req,res){
  contract('Senpai', function(accounts) {
    it("should get title", function() {
      return Senpai.deployed().then(function(instance) {
        instance.create_product("title", "url", 1,
      		1, 1, 1, "CSED232", "한글");
      });
    });
  });
  res.send('소스 등록이 완료되었습니다.');
});
*/

app.get('/naver', function(req, res, next) {
  res.render('naver', { title: 'Naver' });
});

app.get('/truffle_test', function(req, res, next) {
  res.render('truffle_test', { title: 'truffle_test' });
});

app.get('/source_upload', function(req, res, next) {
  res.render('source_upload', { title: 'source_upload' });
});

app.get('/source', function(req, res, next) {
  res.render('source', { title: 'source' });
});

app.get('/ask', function(req, res, next) {
  res.render('ask', { title: 'ask' });
});

app.get('/ask_new', function(req, res, next) {
  res.render('ask_new', { title: 'ask_new' });
});

app.get('/search/', function(req, res, next) {
  res.redirect('search', { title: 'Search' });
});

app.get('/error', function(req, res, next) {
  res.redirect('error', { title: 'error' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req)
  console.log(res)

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

app.listen(3001, function(){
    console.log('Connected 3001 port!');
});
