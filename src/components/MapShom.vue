<template>
    <div class="map" @mouseout.prevent="removeCoord" ref="Shom_IN"></div>
    <div class="mouseTracker">
        <p>{{ coordinate }}</p>
    </div>
    <EntityResult :values="dataEntity" v-show="false" ref="entity"></EntityResult>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet';
import "leaflet-draw";

import EntityResult from "./queryComponents/EntityResult.vue";

export default {
  name: 'MapShom',
  components: {
    EntityResult,
  },
  props: {
    queryResult:  {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      url: "shom.wms.geomod.fr/KARMOR_MAP_SERVICES/wms",
      login: "masterTSI",
      pwd: "fx7Hvd7J2BZF@C",
      wmsLayers: [
        "base",
        "hydrography",
        "soundings",
        "dangers",
        "restrictions",
        "topo",
        "aton",
        "meta"
      ],
      wmsNames: [
        "Base Layer",
        "Hydrography",
        "Soundings",
        "Dangers",
        "Restrictions",
        "Topography",
        "Aids To Navigation",
        "Metadata"
      ],
      tryDict: {
        hydrography: 0,
        soundings: 0,
        dangers: 0,
        restrictions: 0,
        topo: 0,
        aton: 0,
        meta: 0
      },
      data: [],
      dataEntity: {},
      userLocation: {},
      onMap: false,
      selectionArea: "",
      layerManager : L.control.layers(),
      layersManaged : L.layerGroup(),
      layerResearchedElements: L.layerGroup(),
      layerDefaultElements: L.layerGroup(),
      layerGeoElements: L.layerGroup(),
      layerAdviceElements: L.layerGroup(),
    }
  },
  watch: {
    queryResult: function (results) {
      if ((results.head.vars.includes("lat") 
          && results.head.vars.includes("lng")) 
          || results.head.vars.includes("wkt")) {
        this.data = results.results.bindings;
        this.displayResult();
      }
    }
  },
  mounted() {
    // Leaflet
    const map = this.setupMap();
    this.setupControls(map);
    this.setupSelectArea(map);
    this.setupResults(map);
    
    //exemple of removing a layer
    //this.layerManager.removeLayer(this.layersManaged.getLayer(this.tryDict["topo"]));

    //Connexion à la fonction au déplacement de la souris
    map.on('mousemove', this.getMousePosition, this);
  },
  methods: {
    setupMap() {
      return L.map(this.$refs['Shom_IN'], {
        zoomControl: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 250,
        attributionControl: false
      }).setView([46.50370875, -10.5], 6.5);
    },
    setupControls(map) {
      L.control.scale({
        position: 'bottomright',
        imperial: false
      }).addTo(map);

      L.control.zoom({
        position: 'bottomright',
      }).addTo(map);

      this.setupLayerControls(map);
    },
    setupLayerControls(map) {
      this.layerManager.setPosition("bottomleft");
      this.layerManager.addTo(map);

      this.wmsLayers.forEach((layerName, i) => {
        const layer = L.tileLayer.wms(
          this.getUrl,
          {
            layers: layerName,
            format: 'image/png',
          }
        );
        if (i == 0) {
          layer.addTo(map);
        }
        if (i > 0) {
          this.layerManager.addOverlay(layer, this.wmsNames[i]);
          this.layersManaged.addLayer(layer);
          this.tryDict[layerName] = this.layersManaged.getLayerId(layer);
        }
      });
    },
    setupSelectArea(map) {
      const drawnItems = L.featureGroup().addTo(map);

      L.drawLocal.draw.toolbar.buttons.rectangle = 'Select an area';
      map.addControl(new L.Control.Draw({
        position: "bottomright",
        draw: {
          polyline: false,
          polygon: false,
          marker: false,
          circle: false, 
          circlemarker:false
        }
      }));

      map.on(L.Draw.Event.DRAWSTART, () => {
        drawnItems.clearLayers();
        this.layerManager.removeLayer(drawnItems);
      });

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        this.selectionArea = layer.getBounds().toBBoxString();

        drawnItems.addLayer(layer).addTo(map);
        this.layerManager.addOverlay(drawnItems, "Selection");
      });
    },
    setupResults (map) {
      this.layerResearchedElements.addLayer(this.layerDefaultElements);
      this.layerResearchedElements.addLayer(this.layerGeoElements);
      this.layerResearchedElements.addLayer(this.layerAdviceElements);

      this.layerResearchedElements.addTo(map);
    },
    displayResult() { 
      this.clearResearchLayer();
      this.data.forEach(element => {
        if (Object.keys(element).includes("lat")
            && element.lat.type == "literal"
            && Object.keys(element).includes("lng")
            && element.lng.type == "literal") {
          if (element.lat.value.includes("°")) {
            const lat = this.convertDegreeToLatlng(element.lat.value);
            const lng = this.convertDegreeToLatlng(element.lng.value);
            this.displayElement([lat, lng], element);
          } else {
            this.displayElement([parseFloat(element.lat.value), parseFloat(element.lng.value)], element);
          }
        } else if (Object.keys(element).includes("wkt")
                  && element.wkt.type == "literal") {
          const upperCoord = coord.toUpperCase();
          let coord = this.checkEPSGWkt(element.wkt.value);
          if (!coord) {
            if (upperCoord.includes("POINT")) {
              const coords = this.extractCoordPointWkt(coord);
              this.displayElement(coords, element);
            } else if (upperCoord.includes("LINESTRING")) {
              let coords = [];
              if (upperCoord.includes("MULTILINESTRING")) {
                coords = this.extractCoordMultiLineWkt(coord);
              } else {
                coords = this.extractCoordLineWkt(coord);
              }
              this.displayLineElement(coords, element);
            } else if (upperCoord.includes("POLYGON")) {
              const coords = this.extractCoordPolygonWkt(coord);
              this.displayPolygonElement(coords, element);
            }
          }
          
        }
      })
    },
    extractCoordPointWkt(coord) {
      coord = coord.split(" ");

      const lng = parseFloat(coord[0].split("(")[coord[0].includes("(") ? 1 : 0]);
      const lat = parseFloat(coord[1].split(")")[0]);
      return [lat, lng];
    },
    extractCoordLineWkt(coord, poly=false) {
      coord = coord.split("(")[coord.includes("(") ? 1 : 0].split(")")[0].split(", ");
      const listPoints = [];

      for (let k = 0; k < coord.length - (poly ? 1 : 0); k++) {    
        listPoints.push(this.extractCoordPointWkt(coord[k]));
      }
      return listPoints;
    },
    extractCoordMultiLineWkt(coord, poly=false) {
      coord = coord.split("((")[coord.includes("((") ? 1 : 0].split("))")[0].split("),(");
      const listCoords = [];

      for (let k = 0; k < coord.length; k++) {
        listCoords.push(this.extractCoordLineWkt(coord[k], poly));
      }
      return listCoords;
    },
    extractCoordPolygonWkt(coord) {
      coord = coord.split("(((")[1].split(")))")[0].split(")),((");
      const listPoints = [];

      for (let k = 0; k < coord.length; k++) {
        listPoints.push(this.extractCoordMultiLineWkt(coord[k], true));
      }
      return listPoints;
    },
    checkEPSGWkt(coord) {
      coord = coord.split("> ");

      if (coord.length > 1 && !coord[0].includes("4326")) {
        return;
      } else if (coord.length > 1) {
        coord = coord[1];
      } else {
        coord = coord[0];
      }
      return coord;
    },
    displayElement(coord, element) {
      switch (element.type.value) {
        case "geo":
          this.createMarker(
            coord, "geo", [38, 50],
            element, this.layerGeoElements, "Geographic Entities"
          );
          break;
        case "advice":
          this.createMarker(
            coord, "advice", [40, 30],
            element, this.layerAdviceElements, "Advice Entities"
          );
          break;
        default:
          this.createMarker(
            coord, "default", [50, 40],
            element, this.layerDefaultElements, "Research Elements"
          );
      }
    },
    displayLineElement(coords, element) {
      const line = L.polyline(coords);

      this.createPopup(line, element);
      this.layerGeoElements.addLayer(line);
      this.addResearchToLayerControl(this.layerGeoElements, "Geographic Entities");
    },
    displayPolygonElement(coords, element) {
      const polygone = L.polygon(coords);

      this.createPopup(polygone, element);
      this.layerGeoElements.addLayer(polygone);
      this.addResearchToLayerControl(this.layerGeoElements, "Geographic Entities");
    },
    createMarker(coord, iconName, iconSize, element, layer, layerName) {
      const icon = L.icon({iconUrl: "markerIcons/" + iconName + ".png", iconSize: iconSize});
      const marker = L.marker(coord, {icon: icon});

      this.createPopup(marker, element);
      layer.addLayer(marker);
      this.addResearchToLayerControl(layer, layerName);
    },
    createPopup(symbol, element) {
      symbol.on("click", async () => {
        symbol.unbindPopup();
        this.dataEntity = element;
        await this.$refs["entity"].$.update();
        symbol.bindPopup(this.$refs["entity"].$el.innerHTML);
        symbol.openPopup();
      })
    },
    addResearchToLayerControl(layer, name) {
      if (!this.layersManaged.hasLayer(layer)) {
        this.layersManaged.addLayer(layer);
        this.layerManager.addOverlay(layer, name);
      }
    },
    clearResearchLayer() {
      this.layerResearchedElements.eachLayer((layer) => {
        layer.clearLayers();
        if (this.layersManaged.hasLayer(layer)) {
        this.layersManaged.removeLayer(layer);
        this.layerManager.remove(layer);
      }
      })
    },
    getMousePosition(pos) {
      this.onMap=true;
      this.userLocation = {
        lat: pos.latlng.lat.toFixed(10),
        lng: pos.latlng.lng.toFixed(10),
      };
    },
    removeCoord() {
      this.onMap=false;
    },
    convertDegreeToLatlng(coord) {
      const firstCut = coord.replace(" ", "").split("°");
      let latLng = parseFloat(firstCut[0]);

      const secondCut = firstCut[1].split("'");
      latLng += parseFloat(secondCut[0].replace(",", ".")) / 60;

      const thirdCut = secondCut[1].split('"');
      if (thirdCut.lenght > 1) {
        latLng += parseFloat(thirdCut[0]) / 3600;
      }
      
      latLng *= coord.includes('N') || coord.includes('E') ? 1 : -1;
      return latLng;
    }
  },
  computed: {
    getUrl () {
      return "https://" + this.login + ":" + this.pwd.replace("@", "%40") + "@" + this.url;
    },
    coordinate () {
      if (this.onMap){
        return "Lat : "+this.userLocation.lat+"\xa0\xa0\xa0 Lng : "+this.userLocation.lng;
      }
      return "Mouse is not over map";
    }
  },
}
</script>

<style>
.map {
  height: 100%;
  width: 100%;
  z-index: 0;
}

.mouseTracker{
  width:330px;
  height:21.5px;
  position: fixed;
  bottom: 1px;
  right: 100px;
}

.mouseTracker p{
  background: white;
  opacity: 60%;
  height:16.5px;
  padding:2px;
  line-height: 1;
  font-size: 0.65em;
  font-family: sans-serif;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 0 solid white;
}

.leaflet-touch .leaflet-draw-toolbar .leaflet-draw-draw-rectangle {
  background-size: 66%;
  background-image: url("../assets/select.png");
  background-position: 5px 5px;
}

.leaflet-control-layers-list{
  padding-top: 0px;
  text-align: left;
}

.leaflet-control-layers-toggle {
  background-size: 66%;
  background-image: url("../assets/layers.png");
  background-position: 8px 8px;
}
</style>
