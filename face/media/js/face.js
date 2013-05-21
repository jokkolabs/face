/*
  maintainer: Fadiga

*/

function face_init() {
        vote();
    refresh();
}

function refresh() {
    $.getJSON('/choosepict', function(data){
      var pict1 = data.picture1;
      var pict2 = data.picture2;

        row1 = '<span class="posted-stylef">' + pict1.vote + ' point(s)</span>' +
               '<a href="#" class="picture_link" >' + '<img .idp=' + data.idp1 + ' src=' + pict1.url + ' alt="" /></a>' +
               '<span class="posted-style"><a  class="partager"href="#">Partager</a></span>' +
               '<span class="posted-style"><a class="zoom" href=' + pict1.url + ' alt="zoom" rel="prettyPhoto[gallery1]"><strong>zoom</strong></span>';
        row2 = '<span class="posted-stylef">' + pict2.vote + ' point(s)</span>' +
               '<a href="#" class="picture_link" >' + '<img .idp=' + data.idp2 + ' src=' + pict2.url + ' alt="" /></a>' +
               '<span class="posted-style"><a class="partager" href="#">Partager</a></span>' +
               '<span class="posted-style"><a class="zoom" href=' + pict2.url + ' alt="zoom" rel="prettyPhoto[gallery1]"><strong>zoom</strong></span>';

        $("#p1").html(row1);
        $("#p2").html(row2);
        is_star();
        vote();
        pretty();
    });
}

function vote(){
    $(".picture_link").click(function() {
        var url = $(this).children("img").attr('.idp');
        $.post('/vote', {'url': url}, function(data) {
                display_alert(data.return, data.return_html, 2);
            }, "json");
        refresh();
    });
}

function is_star(){
    $.getJSON('/choosepict', function(data){
        var pstar = data.star;
        star = '<div id="cbox1"><ul class="gallery clearfix"><li><a href=' +
              pstar.url + ' rel="prettyPhoto"><img src=' +
              pstar.url + ' alt="" /></a></li></ul>' + '<span class="posted-stylef">' +
              pstar.vote + ' point(s)</span></div></div>';
        $(".star").html(star);
        pretty();
    });
}

function showgallery(){
    $.getJSON('/picturelist', function(all_pictures){
      $.each(all_pictures, function(key, data) {
        row = '<li><a title="' + data.vote + ' point(s)" href="' + data.url + '" rel="prettyPhoto[gallery1]"><img src="' +
              data.url + '" alt="' + data.vote + ' point(s)" /></a></li>';
        $(".row-fluid ul").append(row);
      });
      pretty();
    });
}

function pretty(){

    $(document).ready(function(){
        $("area[rel^='prettyPhoto']").prettyPhoto();

        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false});
        $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});

        $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
            custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
            changepicturecallback: function(){ initialize(); }
        });

        // $.prettyPhoto.open(linkurl+'?iframe=true&amp;width=100%&amp;height=100%',title);
        $("#custom_content a[rel^='prettyPhoto']:last").prettyPhoto({
            custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
            changepicturecallback: function(){ _bsap.exec(); }
        });
    });
    (function(){
      var bsa = document.createElement('script');
         bsa.type = 'text/javascript';
         bsa.async = true;
         bsa.src = '//s3.buysellads.com/ac/bsa.js';
      (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
    })();
}