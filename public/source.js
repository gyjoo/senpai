$.getScript( "senpai_hazimae.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load senpai_hazimae.js was performed." );
})

$(document).ready(function() {

  $('a.recent').click( function() {
    console.log($('span.keyword_text').text())
    $(location).attr('href', 'http://localhost:3001/source?keyword='+$('span.keyword_text').text()+'&sort=recent')
  })
  $('a.like').click( function() {
    console.log($('span.keyword_text').text())
    $(location).attr('href', 'http://localhost:3001/source?keyword='+$('span.keyword_text').text()+'&sort=like')
  })
  $('a.download').click( function() {
    console.log($('span.keyword_text').text())
    $(location).attr('href', 'http://localhost:3001/source?keyword='+$('span.keyword_text').text()+'&sort=download')
  })

  $('li.page_button').removeClass('on');
  $('li.page_button.source').addClass('on');

});
