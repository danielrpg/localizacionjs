/***********************    Objetos      ********************/


function Supervisor(correo, clave, activo) {
    this.correo = correo;
    this.clave = clave;    
    if (activo == "" || activo === undefined) {
        activo = 1;
    }
    this.activo = activo;
    /*
    this.activar = function(){        
        this.activo = 0;
    }
    */
}

function Dispositivo(nombre, supervisor, vinculado) {
    this.nombre = nombre;
    this.supervisor = supervisor;    
    if (vinculado == "" || vinculado === undefined) {
        vinculado = false;
    }
    this.vinculado = vinculado;
    
    this.setVinculado = function (newVinculado) {
        this.vinculado = newVinculado;
    }
}

function Posicion(dispositivo, latitud, longitud, fechaHora) {
    this.dispositivo = dispositivo;
    this.latitud = lattitud;
    this.longitud = longitud;
    this.fechaHora = fechaHora;
}


exports.Supervisor = Supervisor;
exports.Dispositivo = Dispositivo;
exports.Posicion = Posicion;