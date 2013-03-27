
function face_init() {
    opacity_img();

    refresh();
    $(document).ready(function(){
        $("#yoxview_custom .posted-style").yoxview({
            lang: "fr",
            backgroundColor: "#000099",
            // autoPlay: true
        });
    });
}

function opacity_img() {
   $('a img').hover(
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    // document.location.href="http://127.0.0.1:8000/";
    $.getJSON('listp/', function(data){
        row1 = '<span class="posted-style">' + data.picture1.favorable + ' point</span> <a href="#" ><img src=' + data.picture1.plink + ' onclick="vote() alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture1.plink + '><img src="" alt="Agrandir" title="" /></span>';
        row2 = '<span class="posted-style">' + data.picture2.favorable + ' point</span> <a href="#" ><img src=' + data.picture2.plink + ' onclick="vote() alt="" /></a> <span class="posted-style"><a href="#">Partager</a></span> <span class="posted-style"><a href=' + data.picture2.plink + '><img src="" alt="Agrandir" title="" /></span>';

        // $("#p1").html(row1);
        // $("#p2").html(row2);
    });
}

function alertp(){

    alert("OK");
}

function vote(picture){
    alert(picture);

}
