
$(document).ready(function() {
  $('input.btn_search').click( function() {
    console.log($('input.search_area').val())
    $(location).attr('href', 'http://localhost:3001/source?keyword='+$('input.search_area').val())
  })

  $('input.btn_search_center').click( function() {
    console.log($('input.search_area_center').val())
    $(location).attr('href', 'http://localhost:3001/source?keyword='+$('input.search_area_center').val())
  })

});
