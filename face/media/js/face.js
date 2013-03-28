
function face_init() {
    refresh();
}

function opacity_img() {

   $('a img').hover(
   function(){ $(this).stop().animate({ opacity : '1.9' }); },
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    $.getJSON('/listp/', function(data){
        row1 = '<span class="posted-style">' + data.picture1.favorable + ' point</span> <a href="#" class="picture_link" ><img  src=' + data.picture1.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture1.plink + '><img src="" alt="Agrandir" title="" /></span>';
        row2 = '<span class="posted-style">' + data.picture2.favorable + ' point</span> <a href="#" class="picture_link" ><img  src=' + data.picture2.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture2.plink + '><img src="" alt="Agrandir" title="" /></span>';

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
    });
}
