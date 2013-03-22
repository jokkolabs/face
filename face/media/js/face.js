
function face_init() {
    opacity_img();
}

function opacity_img() {
   $('a img').hover(
   function(){ $(this).stop().animate({ opacity : '.75' }); },
   function(){ $(this).stop().animate({ opacity : '1' }); }
  );
}

function refresh() {
    document.location.href="http://127.0.0.1:8000/";
}
