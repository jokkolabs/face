
function face_init() {

    refresh();
    $(document).ready(function(){
        $("area[rel^='prettyPhoto']").prettyPhoto();

        $(".gallery:first a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false});
        $(".gallery:gt(0) a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});

        $("#custom_content a[rel^='prettyPhoto']:first").prettyPhoto({
            custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
            changepicturecallback: function(){ initialize(); }
        });

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

function opacity_img() {

   $('picture_link a img').hover(
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    $.getJSON('/listp/', function(data){
        row1 = '<span class="posted-stylef">' + data.picture1.favorable + ' point(s)</span>' +
               '<a href="#" class="picture_link" >' + '<img  src=' + data.picture1.plink + ' alt="" /></a>' +
               '<span class="posted-style"><a  class="partager"href="#">Partager</a></span>' +
               '<span class="posted-style"><a href=' + data.picture1.plink + '><img src="" class="zoom" alt="zoom" title="" /></span>';
        row2 = '<span class="posted-stylef">' + data.picture2.favorable + ' point(s)</span>' +
               '<a href="#" class="picture_link" >' + '<img  src=' + data.picture2.plink + ' alt="" /></a>' +
               '<span class="posted-style"><a class="partager" href="#">Partager</a></span>' +
               '<span class="posted-style"><a class="zoom" href=' + data.picture2.plink + '><img src=""  alt="zoom" title="" /></span>';

        is_star();
        $("#p1").html(row1);
        $("#p2").html(row2);
        chow_image();
        vote();
        opacity_img();
    });
}

function chow_image(){
    $(".chow_picture").yoxview({
        lang: "fr",
        backgroundColor: "#000099",
        // autoPlay: true
    });
}

function vote(){
    $(".picture_link").click(function() {
        var link = $(this).children("img").attr('src');
        $.post('/vote/', {'link': link}, function(data) {
                display_alert(data.return, data.return_html, 2);
            }, "json");
        is_star();
        refresh();
    });
}

function is_star(){
        $.getJSON('/listp/', function(data){
        star = '<div id="cbox1"><div class="pics"><ul class="gallery clearfix">' +
               '<a href=' + data.star.plink + ' rel="prettyPhoto[gallery1]" ><img src=' + data.star.plink + ' alt="" /></a>' +
               '<span class="posted-style">' + data.star.favorable + ' point(s)</span></ul></div></div>';
        $(".star").html(star);
    });
}