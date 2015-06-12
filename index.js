var servidor = require("./servidor.js");
var enrutador = require("./enrutador.js");
var gestor = require("./gestor.js");

var gestion = {};
gestion["/inicio"] = gestor.inicio;
gestion["/index"] = gestor.inicio;
gestion["/"] = gestor.inicio;
gestion["/error"] = gestor.error;
gestion["/dispositivo"] = gestor.dispositivo;
gestion["/admin"] = gestor.admin;
gestion["/registro"] = gestor.registro;
gestion["/doRegistro"] = gestor.doRegistro;
gestion["/confirmar"] = gestor.confirmar;
gestion["/olvido"] = gestor.olvido;
gestion["/doOlvido"] = gestor.doOlvido;
gestion["/recuperar"] = gestor.recuperar;
gestion["/doRecuperar"] = gestor.doRecuperar;
gestion["/doAcceder"] = gestor.doAcceder;
gestion["/supervisor"] = gestor.supervisor;
gestion["/doIniciar"] = gestor.doIniciar;
gestion["/fin"] = gestor.fin;
gestion["/ajaxSend"] = gestor.ajaxSend;
gestion["/ajaxDesvincular"] = gestor.ajaxDesvincular;
gestion["/ajaxBorrar"] = gestor.ajaxBorrar;
gestion["/ajaxRefrescar"] = gestor.ajaxRefrescar;
gestion["/ver"] = gestor.ver;

gestion[".css"] = gestor.css;
gestion[".js"] = gestor.js;
gestion[".png"] = gestor.png;
gestion[".eot"] = gestor.eot;
gestion[".ttf"] = gestor.ttf;
gestion[".svg"] = gestor.svg;
gestion[".woff"] = gestor.woff;
gestion[".woff2"] = gestor.woff2;

servidor.iniciar(enrutador.enrutar, gestion);
