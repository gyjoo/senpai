
$.getScript( "senpai_hazimae.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});

function submitContents(option) {
    var title = $('#addContentSubject').val();
    var content = $('#addContents').val();
    var sourceType = $('#addContentSourceType').val();
    var classNumber = $('#addContentClassNumber').val();
    if(option == 'add') {
        // 새 글 등록 시
        if(title == '' || content == '' || sourceType == '' || classNumber == '') {
            alert("제목과 내용, 작성자 비밀번호 모두 있어야합니다.");
            return;
        } else {
            alert("확인");
            App.createProduct("서성욱", "호이", 1, 1, 1, 1, "CSED331", "한글");
            $('#writeAction').submit();
        }
    }
}
