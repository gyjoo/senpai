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
  $('button#refresh').click( function() {
    // console.log(App);
    // App.getProductsTotal(function(products_total){
    //       console.log('전체 글 수'+products_total);
    // });

    App.getProductsInfo(function(products_info) {

      infos = products_info
      t = infos['0'];
      for (i=0; i<10; i++) {
        console.log('ka', infos[i]);
        $(".post_txt")[i].innerText = infos[i].description;
        $(".post_title")[i].innerText = infos[i].description;
      }
      // $(location).attr('href', 'http://localhost:3001/source?info='+products_info['0'])
    });
    // console.log(products[0]);
    // alert(products);
    // $(location).attr('href', 'http://localhost:3001/source?sources='+products)
    // console.log($('span.keyword_text').text())
    // $(location).attr('href', 'http://localhost:3001/source?keyword='+$('span.keyword_text').text()+'&sort=download')
  })

  $('li.page_button').removeClass('on');
  $('li.page_button.source').addClass('on');

});
