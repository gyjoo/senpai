var express = require('express');
var Source = require('../model/sourceSchema'); //db를 사용하기 위한 변수
var fs = require('fs');
var multer = require('multer'); // 파일 저장을 위한  multer
var upload = multer({dest:'uploads/'}); // multer 경로 설정, 파일이 업로드 되면 먼저 임시 폴더로 가서 저장됨
var router = express.Router();


// router.get('/', function(req,res){
    // 처음 index로 접속 했을시 나오는 부분
    // db에서 게시글 리스트 가져와서 출력
    // pagination 추가 -> 11/17
    // page는 1-5까지 보여줌 -> db에서 총 갯수 잡아와서 10으로 나눠서 올림해야함
    // 한페이지에 10개의 게시글: limit: 10, skip: (page-1)*10 이면 될 듯
    // page number는 param으로 받아오기 가장 처음엔 param 없으니까 그땐 자동 1로 설정
    //
    // var page = req.param('page');
    // if(page == null) {page = 1;}
    //
    // var skipSize = (page-1)*10;
    // var limitSize = 10;
    // var pageNum = 1;


    // BoardContents.count({deleted:false},function(err, totalCount){
    //    // db에서 날짜 순으로 데이터들을 가져옴
    //     if(err) throw err;
    //
    //     pageNum = Math.ceil(totalCount/limitSize);
    //     BoardContents.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
    //         if(err) throw err;
    //         res.render('board', {title: "Board", contents: pageContents, pagination: pageNum, searchWord: ''});
    //     });
    // });
    // var sources = [['[산경] IMEN 231 - 최적화개론 / 2015 중간고사', '2015년 1학기와 2학기 중간고사 시험지 모음입니다. 굉장히 유용한 자료입니다'], ['[컴공] CSED 451 - 컴퓨터비전 개론 / 2016 참고자료', '컴퓨터 비전과 관련된 수업 교재와 pdf 모음입니다.']]
// });


router.get('/', function(req, res, next) {
  var sort = req.query.sort;
  var keyword = req.query.keyword;
  var sources = [['[산경] IMEN 231 - 최적화개론 / 2015 중간고사', '2015년 1학기와 2학기 중간고사 시험지 모음입니다. 굉장히 유용한 자료입니다'], ['[컴공] CSED 451 - 컴퓨터비전 개론 / 2016 참고자료', '컴퓨터 비전과 관련된 수업 교재와 pdf 모음입니다.']]
  res.render('source', { title: 'source', keyword: keyword, sort: sort, sources: sources});
});

/*
router.get('/search', function(req, res){
    // 글 검색하는 부분
    var search_word = req.param('searchWord');
    var searchCondition = {$regex:search_word};

    var page = req.param('page');
    if(page == null) {page = 1;}
    var skipSize = (page-1)*10;
    var limitSize = 10;
    var pageNum = 1;

    BoardContents.count({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]},function(err, searchCount){
        if(err) throw err;
        pageNum = Math.ceil(searchCount/limitSize);

        BoardContents.find({deleted:false, $or:[{title:searchCondition},{contents:searchCondition},{writer:searchCondition}]}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, searchContents){
            if(err) throw err;

            res.render('board', {title: "Board", contents: searchContents, pagination: pageNum, searchWord: search_word});
        });
    });
});
*/

router.post('/', upload.single('UploadFile'),function(req, res){


    var addNewTitle = req.body.addContentSubject;
    var addNewContent = req.body.addContents;
    var addNewWriter = '주기영';
    var addNewSourceType = req.body.addContentSourceType;
    var addNewClassNumber = req.body.addContentClassNumber;
    var upFile = req.file; // 업로드 된 파일을 받아옴
    // var modTitle = req.body.modContentSubject;
    // var modContent = req.body.modContents;
    // var modId = req.body.modId;

    // if(mode == 'add) {
    if (1==1) {
      // addBoard(addNewTitle, addNewContent, addNewSourceType, addNewClassNumber, upFile);

      res.redirect('/source');
        // if (isSaved(upFile)) { // 파일이 제대로 업로드 되었는지 확인 후 디비에 저장시키게 됨
        //   console.log('#4-2');
        //   addBoard(addNewTitle, addContentSourceType, addNewContent, addNewPassword, upFile);
        //   res.redirect('/source');
        // } else {
        //   console.log("파일이 저장되지 않았습니다!");
        // }
    } else {
      console.log('#3-2');
        modBoard(modId, modTitle, modContent);
        res.redirect('/source');
    }
});

/*
router.get('/download/:path', function(req, res){
    // file download

    var path = req.params.path;
    res.download('./upload/'+path, path);
    console.log(path);
});

router.post('/reply', function(req, res){
    // 댓글 다는 부분
    var reply_writer = req.body.replyWriter;
    var reply_comment = req.body.replyComment;
    var reply_id = req.body.replyId;

    addComment(reply_id, reply_writer, reply_comment);

    res.redirect('/boards/view?id='+reply_id);
});

router.get('/reply', function(req, res) {
    // 댓글 ajax로 페이징 하는 부분
    var id = req.param('id');
    var page = req.param('page');
    var max = req.param('max'); // 댓글 총 갯수 확인
    var skipSize = (page-1)*5;
    var limitSize = skipSize + 5;

    if(max < skipSize+5) {limitSize = max*1;} // 댓글 갯수 보다 넘어가는 경우는 댓글 수로 맞춰줌 (몽고디비 쿼리에서 limit은 양의 정수여야함)

    BoardContents.findOne({_id: id}, {comments: {$slice: [skipSize, limitSize]}} , function(err, pageReply){
        if(err) throw err;
        res.send(pageReply.comments);
    });
});

router.get('/delete', function(req, res) {
    // 삭제하는 부분

    var contentId = req.param('id');

    BoardContents.update({_id:contentId}, {$set:{deleted:true}}, function(err){
        if(err) throw err;
        res.redirect('/boards');
    });
});

router.get('/view', function(req, res){
    // 글 보는 부분. 글 내용을 출력하고 조회수를 늘려줘야함
    // 댓글 페이지 추가 해줌, 5개씩 출력함

    var contentId = req.param('id');

    BoardContents.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
        rawContent.count += 1;
        var reply_pg = Math.ceil(rawContent.comments.length/5);

        rawContent.save(function(err){
            if(err) throw err;

            res.render('boardDetail',{title: "Board", content:rawContent, replyPage: reply_pg});
        });
    })
});
*/

module.exports = router;


function addBoard(title, content, sourceType, classNumber, upFile){
    var newContent = content.replace(/\r\n/gi, "\\r\\n");
    console.log('#1');
    var source = new Source;
    source.title = title;
    source.contents = content;
    source.sourceType = sourceType;
    source.classNumber = classNumber;

    source.save(function (err) {
      console.log('#3');
        if (err) throw err;
        Source.findOne({_id: source._id}, {_id: 1}, function (err, newBoardId) {
            if (err) throw err;

            if (upFile != null) {
                var newFileName = getDirname(1)+"uploads/"+getFileDate(new Date())+'_'+upFile.originalname
                console.log(newFileName);
                fs.rename(upFile.path, newFileName, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                // }

                // for (var i = 0; i < upFile.length; i++) {
                Source.update({_id: newBoardId.id}, {$push: {fileUp: newFileName}}, function (err) {
                    if (err) throw err;
                });
                // }
            }
        });
    });
}

// function modBoard(id, title, content) {
//     var modContent = content.replace(/\r\n/gi, "\\r\\n");
//
//     BoardContents.findOne({_id:id}, function(err, originContent){
//         if(err) throw err;
//         originContent.updated.push({title: originContent.title, contents:originContent.contents});
//         originContent.save(function(err){
//             if(err) throw err;
//         });
//     });
//
//     BoardContents.update({_id:id}, {$set: {title: title, contents: modContent, date: Date.now()}}, function(err) {
//         if(err) throw err;
//     });
// }
//
// function addComment(id, writer, comment) {
//     BoardContents.findOne({_id: id}, function(err, rawContent){
//         if(err) throw err;
//
//         rawContent.comments.unshift({name:writer, memo: comment});
//         rawContent.save(function(err){
//             if(err) throw err;
//         });
//     });
// }

function getFileDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var fullDate = year+""+month+""+day+""+hour+""+min+""+sec;

    return fullDate
}

function renameUploadFile(itemId, upFile){
    // 업로드 할때 리네이밍 하는 곳!
    var renameForUpload = {};
    var newFile = upFile; // 새로 들어 온 파일
    // var tmpPath = [];
    // var tmpType = [];
    // var index = [];
    // var rename = [];
    // var fileName = [];
    // var fullName = []; // 다운로드 시 보여줄 이름 필요하니까 원래 이름까지 같이 저장하자!
    // var fsName = [];

    console.log('renameUploadFile');
    console.log(itemId);
    console.log(getFileDate(new Date()));
    // console.log('upFile', upFile);

    // for (var i = 0; i < newFile.length; i++) {
    //     tmpPath[i] = newFile[i].path;
    //     tmpType[i] = newFile[i].mimetype.split('/')[1]; // 확장자 저장해주려고!
    //     index[i] = tmpPath[i].split('/').length;
    //     rename[i] = tmpPath[i].split('/')[index[i] - 1];
    //     fileName [i] = itemId + "_" + getFileDate(new Date()) + "_" + rename[i] + "." + tmpType[i]; // 파일 확장자 명까지 같이 가는 이름 "글아이디_날짜_파일명.확장자"
    //     fullName [i] = fileName[i] + ":" + newFile[i].originalname.split('.')[0]; // 원래 이름까지 같이 가는 이름 "글아이디_날짜_파일명.확장자:보여줄 이름"
    //     fsName [i] = getDirname(1)+"upload/"+fileName[i]; // fs.rename 용 이름 "./upload/글아이디_날짜_파일명.확장자"
    // }

    // renameForUpload.tmpname = 1;
    var tmpPath = newFile.path;
    var tmpType = newFile.mimetype.split('/')[1]; // 확장자 저장해주려고!
    var index = tmpPath.split('/').length;
    var rename = tmpPath.split('/')[index - 1];
    renameForUpload.tmpname = tmpPath;
    renameForUpload.fileName = itemId + "_" + getFileDate(new Date()) + "_" + rename + "." + tmpType; // 파일 확장자 명까지 같이 가는 이름 "글아이디_날짜_파일명.확장자"
    renameForUpload.fullname = renameForUpload.fileName + ":" + newFile.originalname.split('.')[0]; // 원래 이름까지 같이 가는 이름 "글아이디_날짜_파일명.확장자:보여줄 이름"
    renameForUpload.fsname = getDirname(1)+"upload/"+renameForUpload.fileName; // fs.rename 용 이름 "./upload/글아이디_날짜_파일명.확장자"

    return renameForUpload;
}

function getDirname(num){
    //원하는 상위폴더까지 리턴해줌. 0은 현재 위치까지, 1은 그 상위.. 이런 식으로
    // 리네임과, 파일의 경로를 따오기 위해 필요함.

    var order = num;
    var dirname = __dirname.split('/');
    var result = '';

    for(var i=0;i<dirname.length-order;i++){
        result += dirname[i] + '/';
    }

    return result;
}

/*
function isSaved(upFile) {
    // 파일 저장 여부 확인해서 제대로 저장되면 디비에 저장되는 방식

    var savedFile = upFile;
    var count = 0;

    if(savedFile != null) { // 파일 존재시 -> tmp폴더에 파일 저장여부 확인 -> 있으면 저장, 없으면 에러메시지
      console.log("##1");
      console.log(savedFile);

        for (var i = 0; i < savedFile.length; i++) {
            if(fs.statSync(getDirname(1) + savedFile[i].path).isFile()){ //fs 모듈을 사용해서 파일의 존재 여부를 확인한다.
                count ++; // true인 결과 갯수 세서
            };

        }
        console.log(savedFile.length);

        if(count == savedFile.length){  //올린 파일 갯수랑 같으면 패스
            return true;
        }else{
            return false;
        }
    }else{ // 파일이 처음부터 없는 경우
      console.log("##2")
        return true;
    }
}*/
