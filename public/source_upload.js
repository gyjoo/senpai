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
            $('#writeAction').submit();
        }
    }
}
