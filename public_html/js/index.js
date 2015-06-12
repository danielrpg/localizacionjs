
function init() {
    var imagen = document.getElementById("imagen");
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || $('body').innerWidth();
    if ( width > 319 ){
        imagen.style.height = ((width * 1050)/2000)+"px";
    }
}

window.addEventListener("load", init);
window.addEventListener("resize", init);