        //DECLARACIÓN DE LAS CAPAS BASE
        //Capa base OSM
        var osm_base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        //Capa base GOOGLE MAPS
        var google_topo = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: 'Map data &copy; <a href="https://www.google.com/maps">Google Maps</a>'
        });

        //Capa base GOOGLE MAPS SATÉLITE
        var google_orto = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: 'Imagery &copy; <a href="https://www.google.com/maps">Google Maps</a>'
        });

        //MAPA PRINCIPAL
        var map = L.map('map', {
            center: [39.9864, -0.0361],
            zoom: 14,
            layers: [google_topo]
        });

        //DEFINIMOS LAS BASEMAPS. SE AÑADEN EN EL CONTROLADOR DE CAPAS EN INDEX.HTML
        var baseMaps = {
            "OpenStreetMap": osm_base,
            "Google Maps": google_topo,
            "Google Satélite": google_orto,
        };
        
        
//---------------------------------------------------------------------------------------------------
//FUNCIONES QUE DEFINEN LA ESTRUCTURA DEL MARCADOR

        //Para un marcador puntual
        function createCustomIconMarker(price) {
            return L.divIcon({
            className: 'custom-div-icon',
            html: `<div class='marker-pin'></div><div class='custom-marker'>${price}</div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
            });
            }

        //Para cada uno de los puntos en una capa de puntos geojson
        function createCustomIconMarker(feature) {
            const price = feature.properties.precio;
            return L.divIcon({
                className: 'custom-div-icon',
                html: `<div class='marker-pin'></div><div class='custom-marker'>${price}</div>`,
                iconSize: [30, 42],
                iconAnchor: [15, 42]
            });
        }
        


//-------------------------------------------------------------------------------------------------------------
//FUNCIONES QUE DEFINEN LA ESTRUCTURA DE LAS POPUPS

        function popupVivienda2(feature, layer) {
            layer.bindPopup(
                "<b>DATOS DEL INMUEBLE</b><br>" +
                "<b>Dirección: </b>" + feature.properties.nombre_cal + "<br>" +
                "<b>Precio del inmueble: </b>" + feature.properties.precio + "<br>" +
                "<b>Tamaño: </b>" + feature.properties.tamano + "<br>" +
                "<b>Habitaciones: </b>" + feature.properties.habitacion + "<br>" +
                "<b>Baños: </b>" + feature.properties.banos + "<br>" +
                "<b>Garaje: </b>" + feature.properties.garaje + "<br>" +
                "<b>Tipo de inmueble: </b>" + feature.properties.tipo_inm + "<br>" +
                "<b>Plantas: </b>" + feature.properties.plantas
            );
            }
        
            function popupVivienda(feature, layer) {
            layer.bindPopup(
                `<div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2c3e50; text-align: center;">Datos del Inmueble</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Dirección:</td>
                            <td style="padding: 5px;">${feature.properties.nombre_cal}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Precio del inmueble:</td>
                            <td style="padding: 5px;">${feature.properties.precio}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Tamaño:</td>
                            <td style="padding: 5px;">${feature.properties.tamano}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Habitaciones:</td>
                            <td style="padding: 5px;">${feature.properties.habitacion}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Baños:</td>
                            <td style="padding: 5px;">${feature.properties.banos}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Garaje:</td>
                            <td style="padding: 5px;">${feature.properties.garaje}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Tipo de inmueble:</td>
                            <td style="padding: 5px;">${feature.properties.tipo_inm}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bold; padding: 5px;">Plantas:</td>
                            <td style="padding: 5px;">${feature.properties.plantas}</td>
                        </tr>
                    </table>
                </div>`
            );
        }
            
//-------------------------------------------------------------------------------
//SCRIPT DEL BOTÓN DE REESTABLECER FILTROS
document.getElementById("reset-filters").addEventListener("click", () => {
    document.getElementById("tipo-inmueble").value = "Todos";
    document.getElementById("precio-minimo").value = '';
    document.getElementById("precio-maximo").value = '';
    applyFilters();
});
