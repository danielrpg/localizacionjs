var url = require("url");
var path = require("path");

function enrutar(gestion, request, response, post, io) {
    var ruta = url.parse(request.url).pathname;
    console.log(ruta);
    if (typeof gestion[ruta] === 'function') {
        gestion[ruta](request, response, post, io);
    } else {		
		var extname = path.extname(ruta);
		if(typeof gestion[extname] === 'function'){
			gestion[extname](request, response, post);
		} else {
			gestion['/error'](request, response);
        }
    }
}
exports.enrutar = enrutar;
