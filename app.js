// var SenpaiArtifact = require('./build/contracts/Senpai.json');

/*
----------------------------------------------------------------------

    ETHEREUM CONTRACTS

----------------------------------------------------------------------
 */

// // Declarations
// var Web3 = require('web3');
// var contract = require('truffle-contract');
//
// // MetaCoin is our usable abstraction, which we'll use through the code below.
// var metacoin_artifacts = require('./build/contracts/MetaCoin.json');
// var MetaCoin = contract(metacoin_artifacts);


/*
----------------------------------------------------------------------

    VIEWS & ROUTINGS

----------------------------------------------------------------------
 */

 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/myDB');
 var index = require('./routes/index');
 var users = require('./routes/users');
 var source = require('./routes/source');
 var fs = require('fs');

 var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
 var upload = multer({ dest: 'uploads/' })
 var Source = require('./model/sourceSchema'); //db를 사용하기 위한 변수

// process.env.PWD = process.cwd()
// app.use(express.static(process.env.PWD + '/public'));

// DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  	console.log("open");
});

var userSchema = mongoose.Schema({
    username: 'string',
    age: 'number'
});
var User = mongoose.model('User', userSchema);
var user1 = new User({ username: 'gchoi', age: 30 });
user1.save(function (err, user1) {
  if (err) console.log("error");
});




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
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));


app.use('/', index);
app.use('/source', source);
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
// 소스 게시하기
//
// router.get('/uploads/imen127.jpeg', function(req, res){
//     // file download
//     var path = req.params.path;
//     res.download('/uploads/imen127.jpeg');
//     console.log(path);
// });

app.get('/naver', function(req, res, next) {
  res.render('naver', { title: 'Naver' });
});

app.get('/truffle_test', function(req, res, next) {
  res.render('truffle_test', { title: 'truffle_test' });
});

app.get('/truffle_senpai_test', function(req, res, next) {
  res.render('truffle_senpai_test', { title: 'truffle_senpai_test' });
});

app.get('/source_upload', function(req, res, next) {
  res.render('source_upload', { title: 'source_upload' });
});

app.get('/source_upload', function(req, res, next) {
  res.render('source_upload', { title: 'source_upload' });
});

app.get('/source_detail', function(req, res, next) {
  // alert(req)
  console.log(req)
  var source = ['[산경] IMEN 231 - 최적화개론 / 2015 중간고사', '2015년 1학기와 2학기 중간고사 시험지 모음입니다. 굉장히 유용한 자료입니다']
  // res.render('source_detail', { title: 'source_detail', source: source });
  var id = req.query.id;
  // var keyword = req.query.keyword;
  // var source = ['[산경] IMEN 231 - 최적화개론 / 2015 중간고사', '2015년 1학기와 2학기 중간고사 시험지 모음입니다. 굉장히 유용한 자료입니다']
  Source.find({_id: id}).exec(function(err, searchContents){
      // if(err) throw err;
      // res.render('source', {title: "Board", contents: searchContents});
      // console.log(searchContents);
      res.render('source_detail', {title: 'source', source: searchContents[0]});
  });
});


app.get('/ask', function(req, res, next) {
  res.render('ask', { title: 'ask' });
});

app.get('/ask_new', function(req, res, next) {
  res.render('ask_new', { title: 'ask_new' });
});

app.get('/search/', function(req, res, next) {
  res.render('search', { title: 'Search' });
});

app.get('/error', function(req, res, next) {
  res.redirect('error', { title: 'error' });
});

app.post('/upload', upload.single('userfile'), function(req, res){
  res.send('Uploaded! : '+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
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
module.exports.rpc = {
  host: "localhost",
  port: 8545
};

// module.exports.metacoin_artifacts = metacoin_artifacts;

// const CopyWebpackPlugin = require('copy-webpack-plugin');
//
// module.exports.module.loaders = {
//       { test: /\.json$/, use: 'json-loader' },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015'],
//           plugins: ['transform-runtime']
//         }
//       }
// }



app.listen(3001, function(){
    console.log('Connected 3001 port!');

});
