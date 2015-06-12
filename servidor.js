var http = require('http');
var enrutador = require("./enrutador.js");
var port = process.env.PORT || 8888;

function iniciar(enrutar, gestion) {    
    var app = http.createServer(atiendePeticion).listen(port);    
    var io = require('socket.io').listen(app);

    function atiendePeticion(request, response) {   
        var post = "";
        request.setEncoding("utf8");
        request.addListener("data", function (postDataChunk) {
            post += postDataChunk;
        });
        request.addListener("end", function () {            
            enrutador.enrutar(gestion, request, response, post, io);
        });
    }
}

exports.iniciar = iniciar;