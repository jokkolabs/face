
function face_init() {
    refresh();
$('#slide').cycle({
    fx:      'custom',
    cssBefore: {
        left: 115,
        top:  115,
        width: 0,
        height: 0,
        opacity: 1,
        display: 'block'
    },
    animOut: {
        opacity: 0
    },
    animIn: {
        left: 0,
        top: 0,
        width: 200,
        height: 200
    },
    cssAfter: {
        zIndex: 0
    },
    delay: -33000
});
}

function opacity_img() {

   $('a img').hover(
   // function(){ $(this).stop().animate({ opacity : '1.9' }); },
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    $.getJSON('/listp/', function(data){
        row1 = '<span class="posted-style">' + data.picture1.favorable + ' point</span> <a href="#" class="picture_link" rel="prettyPhoto[gallery1]"><img  src=' + data.picture1.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture1.plink + '><img src="" class="agrandir" alt="Agrandir" title="" /></span>';
        row2 = '<span class="posted-style">' + data.picture2.favorable + ' point</span> <a href="#" class="picture_link" rel="prettyPhoto[gallery1]"><img  src=' + data.picture2.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture2.plink + '><img src="" class="agrandir" alt="Agrandir" title="" /></span>';

        $("#p1").html(row1);
        $("#p2").html(row2);
        chow_image();
        vote();
        opacity_img();
        is_star();
    });

}

function chow_image(){
    $(".chow_picture").yoxview({
        lang: "fr",
        backgroundColor: "#000099",
        // autoPlay: true
    });
}

function alertp(){

    alert("OK");
}

function vote(){
    $(".picture_link").click(function() {
        var link = $(this).children("img").attr('src');
        $.post('/vote/', {'link': link}, function(data) {
                display_alert(data.return, data.return_html, 2);
            }, "json");
        face_init();
        is_star();
    });

}

function is_star(){
        $.getJSON('/listp/', function(data){
        star = '<div id="cbox1" class="chow_picture"><div id="slide" class="pics"><a  href=' + data.star.plink + '><img src=' + data.star.plink + ' alt="" /></a><span class="posted-style">' + data.star.favorable + ' point</span></div></div>';
        $("#star").html(star);

    });
}