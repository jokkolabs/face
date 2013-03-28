
function face_init() {
    refresh();
    opacity_img();
}

function opacity_img() {
   $('a img').hover(
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    $.getJSON('listp/', function(data){
        row1 = '<span class="posted-style">' + data.picture1.favorable + ' point</span> <a href="#" ><img id="picture_link" src=' + data.picture1.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture1.plink + '><img src="" alt="Agrandir" title="" /></span>';
        row2 = '<span class="posted-style">' + data.picture2.favorable + ' point</span> <a href="#" ><img id="picture_link" src=' + data.picture2.plink + ' alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture2.plink + '><img src="" alt="Agrandir" title="" /></span>';

        $("#p1").html(row1);
        $("#p2").html(row2);
        chow_image();
    });
}

function chow_image(){
    $("#yoxview_custom #p1, #p2").yoxview({
        lang: "fr",
        backgroundColor: "#000099",
        // autoPlay: true
    });
}

function alertp(){

    alert("OK");
}

function vote(){
    $("#picture_link").click(function() {
        var link = $(this).attr('picture_link');
        alert(link);
        $.post('vote/', {'picture_link': picture_link}, function(data) {
                display_alert(data.return, data.return_html, 2);
                face_init();
            }, "json");

    });
}
