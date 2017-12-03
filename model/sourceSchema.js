/*** 게시물 db 스키마 ***/


var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var sourceSchema = mongoose.Schema({
    writer: String,
    sourceType: String,
    classNumber: String,
    price: Number,
    department: String,
    title: String,
    contents: String,
    comments: [{
        name: String,
        memo: String,
        date: {type: Date, default: Date.now}
    }],
    count: {type:Number, default: 0},
    date: {type: Date, default: Date.now},
    updated: [{title: String, contents: String, date:{type: Date, default: Date.now}}],
    deleted: {type: Boolean, default: false}, // true면 삭제 된 경우임
    fileUp:[String] // 업로드 된 파일 저장된 주소
});
sourceSchema.plugin(autoIncrement.plugin, 'Source');
module.exports =  mongoose.model('Source', sourceSchema);
