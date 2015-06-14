$(function(){

    var map;
    var lat;
    var lon;
    var fh;
    var marcador1;
    var polyline;
    var smallMarket = L.divIcon({iconSize: new L.Point(20, 20), className: 'small-icon'});
    var arrayMarcadores = [];
    /*
    var arrayPosicion = [];
    var arrayPosicionDia = [];
    */
    var arrayLatLon = [];     
    var animatedMarker; 
    var fechaDia;

    /****************************************************/
    /******************    Funciones    *****************/
    /****************************************************/
    
    function existeAnyo(anyo) {    
        for (var i = 0; i < fechasValidas.length; i++) {    
            if( fechasValidas[i].anyo == anyo ) {
                return i;
            }
        }   
        return -1;
    }

    function existeMes(mes, i) {      
        for (var j = 0; j < fechasValidas[i].meses.length; j++) {    
            if( fechasValidas[i].meses[j].mes == mes ) {
                return j;
            }
        }
        return -1;
    }

    function existeDia(dia, i, j) {    
        for (var k = 0; k < fechasValidas[i].meses[j].dias.length; k++) {    
            if( fechasValidas[i].meses[j].dias[k].dia == dia ) {
               return k;
            }
        }
        return -1;
    }

    function addFecha(anyo, mes, dia) {
        var comprobarAnyo = existeAnyo(anyo);
        if( comprobarAnyo == -1){
            console.log(dia);
            fechasValidas.unshift({
            //fechasValidas.push({
                anyo: anyo,
                meses: [
                    {
                        mes: mes,
                        dias: [
                            {
                                dia: dia
                            }
                        ]
                    }
                ]
            });
            return "anyo";
        } else {
            var comprobarMes = existeMes(mes, comprobarAnyo);
            if( comprobarMes == -1 ){                
                console.log(dia);
                fechasValidas[comprobarAnyo].meses.unshift({
                //fechasValidas[comprobarAnyo].meses.push({
                    mes: mes,
                    dias:  [
                        {
                            dia: dia
                        }
                    ]
                });
                return "mes";
            } else {
                var comprobarDia = existeDia(dia, comprobarAnyo, comprobarMes);
                if( comprobarDia == -1 ){
                    console.log(dia);
                    fechasValidas[comprobarAnyo].meses[comprobarMes].dias.unshift({
                    //fechasValidas[comprobarAnyo].meses[comprobarMes].dias.push({
                        dia: dia
                    });
                }
                return "dia";
            }
        }
        return -1;
    }

    function crearSelect(anyoSelect, valorAnyo, mesSelect, valorMes, diaSelect, valorDia) {
        $("#anyo").empty();
        for (var i = 0; i < fechasValidas.length; i++) {    
            if (fechasValidas[i].anyo == valorDia) {
                $("#anyo").append($('<option>', {
                    value: fechasValidas[i].anyo,
                    text: fechasValidas[i].anyo,
                    class: "anyos",
                    selected: "selected",
                    'data-anyo': i
                }));
            } else {
                $("#anyo").append($('<option>', {
                    value: fechasValidas[i].anyo,
                    text: fechasValidas[i].anyo,
                    class: "anyos",
                    'data-anyo': i
                }));
            }
        }
        $("#mes").empty();
        for (var j = 0; j < fechasValidas[anyoSelect].meses.length; j++) {    
            if (fechasValidas[anyoSelect].meses[j].mes == valorMes) {
                $("#mes").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[j].mes,   
                    text: fechasValidas[anyoSelect].meses[j].mes,
                    class: "meses",
                    selected: "selected",
                    'data-mes': j
                }));
            } else {
                $("#mes").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[j].mes,   
                    text: fechasValidas[anyoSelect].meses[j].mes,
                    class: "meses",
                    'data-mes': j
                }));                    
            }
        }
        $("#dia").empty();
        console.log("dias del select");
        for (var k = 0; k < fechasValidas[anyoSelect].meses[mesSelect].dias.length; k++) {
            console.log(fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia);   
            console.log(valorDia);   
            if (fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia == valorDia) {               
                $("#dia").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,   
                    text: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,
                    class: "dias",
                    selected: "selected",
                    'data-dia': k
                }));
            } else {
                $("#dia").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,   
                    text: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,
                    class: "dias",
                    'data-dia': k
                }));
            }
        }
    }

    function animacion(poly, elemento){
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.zoomControl.removeFrom(map);
        
        $( "#ver" ).addClass("pure-button-disabled");

        animatedMarker = L.animatedMarker(poly.getLatLngs(), {
            distance: 300,  // meters
            //interval: 5000, // milliseconds
            interval: 1000, // milliseconds
            autoStart: false,
            onEnd: function(){
                map.scrollWheelZoom.enable();
                map.doubleClickZoom.enable();
                map.zoomControl.addTo(map);

                map.removeLayer(animatedMarker);

                $( "#ver" ).removeClass("pure-button-disabled");

                lat = parseFloat(elemento.latitud);
                lon = parseFloat(elemento.longitud);
                fh = elemento.fechaHora.substring(elemento.fechaHora.length - 8); 

                marcador1 = L.marker([lat, lon]).addTo(map)
                    .bindPopup(fh)
                    .openPopup();
            }
        });
        map.addLayer(animatedMarker);
        setTimeout(function() {  
            animatedMarker.start();
        }, 500);   
    }

    /****************************************************/
    /*****************  Inicializacion  *****************/
    /****************************************************/


	arrayPosicion.sort(function (a, b) {
        return (a.fechaHora - b.fechaHora);
    });

    var fechasValidas = [];

    //for (var i = (arrayPosicion.length - 1); i > -1; i--) { 
    if( arrayPosicion.length > 0 ) {
        for (var i = 0; i < arrayPosicion.length; i++) { 
            console.log(arrayPosicion[i]);   
            var anyo = arrayPosicion[i].fechaHora.substring(0,4);    
            var mes = arrayPosicion[i].fechaHora.substring(5,7);    
            var dia = arrayPosicion[i].fechaHora.substring(8,10);

            addFecha(anyo, mes, dia);
        }       
    
        crearSelect(0, -1, 0, -1, 0, -1);

        var arrayPosicionDia = [];
        fechaDia = arrayPosicion[ arrayPosicion.length - 1 ].fechaHora.substring(0,10);
        for (var i = 0; i < arrayPosicion.length; i++) {
            if(arrayPosicion[i].fechaHora.substring(0,10) == fechaDia){
                arrayPosicionDia.push(arrayPosicion[i]);
            }
        }

        // actualizar los select al cambiar valores del dia
        $( "#anyo" ).change(function() {
            var anyoSelect = $("#anyo option").not(function(){ return !this.selected }).attr("data-anyo");
            //console.log(i);
           // console.log(fechasValidas[0]);
           // console.log(fechasValidas[anyoSelect]);
            $("#mes").empty();
            for (var j = 0; j < fechasValidas[anyoSelect].meses.length; j++) {    
                $("#mes").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[j].mes,   
                    text: fechasValidas[anyoSelect].meses[j].mes,
                    class: "meses",
                    'data-mes': j
                }));
            }
            $("#dia").empty();        
            for (var k = 0; k < fechasValidas[anyoSelect].meses[0].dias.length; k++) {                  
                $("#dia").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[0].dias[k].dia,   
                    text: fechasValidas[anyoSelect].meses[0].dias[k].dia,
                    class: "dias",
                    'data-dia': j
                }));
            }
        });

        $( "#mes" ).change(function() {
            var anyoSelect = $("#anyo option").not(function(){ return !this.selected }).attr("data-anyo");
            var mesSelect = $("#mes option").not(function(){ return !this.selected }).attr("data-mes");
            $("#dia").empty();        
            for (var k = 0; k < fechasValidas[anyoSelect].meses[mesSelect].dias.length; k++) {                  
                $("#dia").append($('<option>', {
                    value: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,   
                    text: fechasValidas[anyoSelect].meses[mesSelect].dias[k].dia,
                    class: "dias",
                    'data-dia': j
                }));
            }
        });
    }

    /****************************************************/
    /**********************  Mapa  **********************/
    /****************************************************/


    console.log(arrayPosicionDia );
    console.log(arrayPosicionDia[arrayPosicionDia.length - 1] );
    if (arrayPosicionDia != undefined && arrayPosicionDia[0] != undefined) {
        lat = parseFloat(arrayPosicionDia[0].latitud);
        //console.log(lat);
        lon = parseFloat(arrayPosicionDia[0].longitud);
       // console.log(lat);
        fh = arrayPosicionDia[0].fechaHora.substring(arrayPosicionDia[0].fechaHora.length - 8);
    } else {
        lat = 37.1744722;
        lon = -3.60910679;
        fh = "No hay datos aun.";
    }

    //var map = L.map('map', { zoomControl: false } ).setView([lat, lon], 18);
    map = L.map('map').setView([lat, lon], 18);

    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        minZoom: 2
    }).addTo(map);


    L.control.scale({
        maxWidth: 250,
        imperial: false
    }).addTo(map);


    var miniMapCntrl = new L.Control.MiniMap(
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'), {
            toggleDisplay: true
    	});
    map.addControl(miniMapCntrl);



    if ( fh != "No hay datos aun." ) {

        /********** Polilinea   *************/
          

        for (var i = 0; i < arrayPosicionDia.length; i++){
            arrayLatLon.push([parseFloat(arrayPosicionDia[i].latitud), parseFloat(arrayPosicionDia[i].longitud)]);
            var marcador2 = new L.marker([arrayPosicionDia[i].latitud, arrayPosicionDia[i].longitud], 
                {icon: smallMarket}).addTo(map)
                .bindPopup(arrayPosicionDia[i].fechaHora.substring(arrayPosicionDia[i].fechaHora.length - 8));
            arrayMarcadores.push(marcador2);
        }

        if(arrayLatLon.length > 1){
            polyline = new L.polyline(arrayLatLon);//.addTo(map);
            map.addLayer(polyline);  
            map.fitBounds(polyline.getBounds());        
            
            animacion(polyline, arrayPosicionDia[arrayPosicionDia.length-1]);   
        }          
    } else {
        $("#fechas").css("display","none");
        var vacio = $("<span id='vacio'>No hay datos aun</span>");
        $("#name").append(vacio);
    }


    /****************************************************/
    /******************  Cambio de dia  *****************/
    /****************************************************/
/*
    if ( arrayPosicion.length < 1 ) {
        $("#ver").off("click");
        $("#ver").addClass("pure-button-disabled");
    } else {
        */
        $("#ver").on("click", function(evt) {        
            evt.preventDefault();           
            var fechaDiaNew = $( "#anyo" ).attr("value") + "-" + 
                    $( "#mes" ).attr("value") + "-" + $( "#dia" ).attr("value");
            if ( (fechaDia != fechaDiaNew) && !($("#ver").hasClass("pure-button-disabled")) ) {
                console.log("ver");
                console.log(fechaDiaNew);
                arrayPosicionDia = [];     
                fechaDia = fechaDiaNew;

                for(var i = 0; i < arrayPosicion.length; i++){
                    if(arrayPosicion[i].fechaHora.substring(0,10) == fechaDia){
                        arrayPosicionDia.push(arrayPosicion[i]);
                    }
                }

                //crear el marcador, la polilinea y mover el marcador
                if ( marcador1 != undefined ) {
                    map.removeLayer(marcador1);
                }
                for (var i = 0; i < arrayMarcadores.length; i++){
                    map.removeLayer(arrayMarcadores[i]);
                }      
                if( polyline != undefined  ) {      
                    map.removeLayer(polyline);
                }

                arrayLatLon = [];
                arrayMarcadores = [];

                for (var i = 0; i < arrayPosicionDia.length; i++){
                    arrayLatLon.push([parseFloat(arrayPosicionDia[i].latitud), parseFloat(arrayPosicionDia[i].longitud)]);
                    var marcador2 = new L.marker([arrayPosicionDia[i].latitud, arrayPosicionDia[i].longitud], 
                        {icon: smallMarket}).addTo(map)
                        .bindPopup(arrayPosicionDia[i].fechaHora.substring(arrayPosicionDia[i].fechaHora.length - 8));
                    arrayMarcadores.push(marcador2);
                }
                
                if( animatedMarker != undefined  &&  animatedMarker != null ) {  
                    map.removeLayer(animatedMarker);
                }
                console.log(arrayLatLon.length);
                if(arrayLatLon.length > 1){
                    polyline = null;
                    polyline = L.polyline(arrayLatLon).addTo(map);
                    //map.addLayer(polyline);  
                    console.log(polyline);
                    map.fitBounds(polyline.getBounds());

                    animacion(polyline, arrayPosicionDia[arrayPosicionDia.length-1]);
                }
            }
        });
    //}

    /****************************************************/
    /******************  Recibe datos   *****************/
    /****************************************************/

	var socket = io.connect('http://localizacionjs.herokuapp.com/');
    //var socket = io.connect('http://localhost:8888/');

    socket.on(idDisp, function(data) {

        var objeto = {
            fechaHora: data.fechaHora,
            latitud: data.latitud,
            longitud: data.longitud
        };

        //agregar la fecha al array y al select si es necesario
        var anyo = data.fechaHora.substring(0,4);    
        var mes = data.fechaHora.substring(5,7);    
        var dia = data.fechaHora.substring(8,10);
        var nuevaFecha = addFecha(anyo, mes, dia);
        if( nuevaFecha != -1){
            var anyoSelect = $("#anyo option").not(function(){ return !this.selected }).attr("data-anyo");
            var valorAnyo = $("#anyo option").not(function(){ return !this.selected }).attr("value")//;.attr("data-anyo");
            var mesSelect = $("#mes option").not(function(){ return !this.selected }).attr("data-mes");
            var valorMes = $("#mes option").not(function(){ return !this.selected }).attr("value");//.attr("data-mes");
            console.log("diaSelect");
            console.log($("#dia option").not(function(){ return !this.selected }));
            var diaSelect = $("#dia option").not(function(){ return !this.selected }).attr("data-dia");
            var valorDia = $("#dia option").not(function(){ return !this.selected }).attr("value");//.attr("data-dia");
            console.log(diaSelect);
            console.log(valorDia);

            if(anyoSelect == undefined) {
                anyoSelect = 0;
            }
            if(mesSelect == undefined) {
                mesSelect = 0;
            }
            if(diaSelect == undefined) {
                diaSelect = 0;
            }
            if(valorAnyo == undefined) {
                valorAnyo = -1;
            }
            if(valorMes == undefined) {
                valorMes = -1;
            }
            if(valorDia == undefined) {
                valorDia = -1;
            }
            crearSelect(anyoSelect, valorAnyo, mesSelect, valorMes, diaSelect, valorDia);

            $("#fechas").css("display","inline-block");
            $("#vacio").remove();
        }


		//añadir la posicion a los array
        if(arrayPosicion == undefined || arrayPosicion == null || arrayPosicion == ""){
            arrayPosicion = [];
            arrayPosicionDia = [];
        }
        arrayPosicion.push(objeto);
        if ( fechaDia == undefined || fechaDia == null || fechaDia == objeto.fechaHora.substring(0,10) ){
            fechaDia == objeto.fechaHora.substring(0,10);
            arrayPosicionDia.push(objeto);

            if ( arrayPosicionDia.length > 1 ) {
                //actualizar la polylinea, crea el marcador secundario en el punto que esta, y mover el marcador grande
                if ( marcador1 != undefined ) {
                    latLng = marcador1.getLatLng();
                    pop = marcador1.getPopup();
                } else {
                    if (arrayMarcadores[arrayMarcadores.length -1] != undefined ) {
                        latLng = arrayMarcadores[arrayMarcadores.length -1].getLatLng();
                        pop = arrayMarcadores[arrayMarcadores.length -1].getPopup();

                        var marcador2Aux = new L.marker(latLng, {icon: smallMarket}).addTo(map)
                            .bindPopup(pop);
                        arrayMarcadores.push(marcador2Aux);
                    }
                }

                if ( marcador1 != undefined ) {
                    map.removeLayer(marcador1);
                }
                if ( polyline != undefined ) {
                    polyline.addLatLng([parseFloat(data.latitud), parseFloat(data.longitud)]);
                    map.fitBounds(polyline.getBounds());
                } else { 
                    arrayLatLon = [];
                    for (var i = 0; i < arrayPosicionDia.length; i++){
                        arrayLatLon.push([parseFloat(arrayPosicionDia[i].latitud), parseFloat(arrayPosicionDia[i].longitud)]);
                    }
                    if(arrayLatLon.length > 1){
                        polyline = new L.polyline(arrayLatLon).addTo(map);
                        map.fitBounds(polyline.getBounds());
                    }                
                }            

                polyAux = L.polyline([
                    [latLng.lat, latLng.lng],
                    [parseFloat(data.latitud), parseFloat(data.longitud)]
                    ]);
                animacion(polyAux, data);    
            } else {
                var marcador2Aux = new L.marker([parseFloat(data.latitud), parseFloat(data.longitud)], {icon: smallMarket}).addTo(map)
                        .bindPopup(data.fechaHora.substring(data.fechaHora.length - 8));
                arrayMarcadores.push(marcador2Aux);
            }
        }   
    });
});