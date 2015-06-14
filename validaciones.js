function validarRegistro(correo, correo1, clave, clave1) {
    var msg = "";
    msg += validarCorreo(correo);
    if (correo != correo1) {
        msg += " * No coinciden los email.<br/>";
    }
    msg += validarClave(clave);
    if (clave != clave1) {
        msg += " * No coinciden las claves.<br/>";
    }

    return msg;
}

function validarReestablecer(correo, clave, clave1) {
    var msg = "";
    msg += validarCorreo(correo);
    msg += validarClave(clave);
    if (clave != clave1) {
        msg += " * No coinciden las claves.<br/>";
    }

    return msg;
}

function validarAcceder(correo, clave) {
    var msg = "";
    msg += validarCorreo(correo);
    msg += validarClave(clave);
    return msg;
}

function validarIniciar(correo, dispositivo, tiempo) {
    var msg = "";
    msg += validarCorreo(correo);
    if (dispositivo.length < 1 || dispositivo.length > 10) {
        msg += " * El nombre del dispositivo tiene que tener entre 1 y 10 caracteres.<br/>";
    }
    if (isNaN(parseInt(tiempo))) {
        msg += " * El intervalo de tiempo de envio de la posicion no es correcto.<br/>";
    }
    return msg;
}

function validarCorreo(correo) {
    var msg = "";
    var expregMail = new RegExp("^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$");
    if (!expregMail.test(correo)) {
        msg += " * El formato de Email no es válido.<br/>";
    }
    return msg;
}

function validarClave(clave) {
    var msg = "";
    var expregClave = /^(?=.*\d)(?=.*[A-z]).{4,8}$/;
    if (!expregClave.test(clave)) {
        msg += " * Clave de 4 a 8 caracteres un digito y una letra al menos.<br/>";
    }
    return msg;
}

function validarFecha(valor) {
    var fecha = valor.substring(0, valor.lastIndexOf("T"));

    var fechaf = fecha.split("-");
    var anof = parseInt(fechaf[0]);
    var mesf = parseInt(fechaf[1]) - 1;
    var diaf = parseInt(fechaf[2]);

    var hora = valor.substring(valor.lastIndexOf("T") + 1, valor.length);

    var horaf = hora.split(":");
    var horasf = parseInt(horaf[0]);
    var minutosf = parseInt(horaf[1]);
    var segundosf = parseInt(horaf[2]);

    var newValor = new Date(anof, mesf, diaf, horasf, minutosf, segundosf);

    if (newValor.getFullYear() != anof || newValor.getMonth() != mesf || newValor.getDate() != diaf || newValor.getHours() != horasf || newValor.getMinutes() != minutosf || newValor.getSeconds() != segundosf) {
        return false;
    }
    return true;
}

function validarPosicion(fechaHora, latitud, longitud){
    if (!validarFecha(fechaHora)) {
        return false;
    }
    if (isNaN(latitud)) {
        return false;
    }
    if (isNaN(longitud)) {
        return false;
    }
    return true;
}

exports.validarRegistro = validarRegistro;
exports.validarReestablecer = validarReestablecer;
exports.validarAcceder = validarAcceder;
exports.validarIniciar = validarIniciar;
exports.validarCorreo = validarCorreo;
exports.validarClave = validarClave;
exports.validarFecha = validarFecha;
exports.validarPosicion = validarPosicion;