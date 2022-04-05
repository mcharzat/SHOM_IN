<template>
  <div class="divMap">
    <div class="map" @mouseout.prevent="removeCoord" ref="Shom_IN"></div>
    <div class="mouseTracker">
        <p>{{ coordinate }}</p>
    </div>
    <EntityResult :values="dataEntity" v-show="false" ref="entity"></EntityResult>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet';
import "leaflet-draw";
import proj4 from 'proj4';

import EntityResult from "./queryComponents/EntityResult.vue";

export default {
  name: 'MapShom',
  emits: ['bboxSelectionArea', 'suppressBboxSelectionArea'],
  components: {
    EntityResult,
  },
  props: {
    queryResultMap:  {
      type: Array,
      default: () => []
    },
    updateNameQuery:  {
      type: Object,
      default: () => {}
    },
    stateDisplayQuery:  {
      type: Object,
      default: () => {}
    },
    removeTheQuery:  {
      type: Object,
      default: () => {}
    },
    demandReset:  {
      type: Number,
      default: 0
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
      categoriesNames: {
        amer: "Amers",
        domaineMaritime: "Domaine maritime",
        phenomenon: "Phénomènes naturels",
        default: "Entités"
      },
      categoriesUrls: {
        amer: [
        "http://data.shom.fr/def/navigation_cotiere#Amer", 
        "http://data.shom.fr/def/navigation_cotiere#AideALaNavigation"
      ],
        domaineMaritime: [
        "http://data.shom.fr/def/navigation_cotiere#ZoneDuDomaineMaritime"],
        phenomenon: [
        "http://data.shom.fr/def/navigation_cotiere#PhenomeneMeteorologiqueOuOceanographique"],
        default: []
      },
      categories: {},
      dataEntity: [],
      userLocation: {},
      onMap: false,
      selectionArea: "",
      layerManager : L.control.layers(),
      layersManaged : L.layerGroup(),
      layerResearchedElements: L.featureGroup(),
      layerByQuery: [],
    }
  },
  mounted() {
    // Leaflet
    const map = this.setupMap();
    this.setupControls(map);
    this.setupCategories();

    this.setupListeners(map);
    this.setupWatchers(map);

    this.setupSelectArea(map);
    this.setupResults(map);
    this.setupProj4();
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
    setupCategories() {
      Object.keys(this.categoriesNames).forEach(category => {
        const buildCategory = {
          label: this.categoriesNames[category],
          urls: this.categoriesUrls[category],
          layer: L.featureGroup()
        }
        this.categories[category] = buildCategory;
      })
    },
    setupListeners(map) {
      //Connexion à la fonction au déplacement de la souris
      map.on('mousemove', this.getMousePosition, this);
    },
    setupWatchers(map) {
      this.$watch('queryResultMap', () => {
        this.displayResult(map);
      });

      this.$watch('updateNameQuery', names => {
        const index = this.selectQueryByName(names.old);
        this.layerByQuery[index].name = names.new;
      });

      this.$watch('stateDisplayQuery', config => {
        const index = this.selectQueryByName(config.name);
        this.handleDisplayQuery(index, config.state, map);
      });

      this.$watch('removeTheQuery', name => {
        const index = this.selectQueryByName(name.name);

        this.handleDisplayQuery(index, false, map);
        this.layerByQuery = this.RemoveElementFromArray(this.layerByQuery, index);
      });

      this.$watch('demandReset', () => {
        this.clearResearchLayer();
        this.layerByQuery = [];
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
        this.$emit("suppressBboxSelectionArea", this.selectionArea);
      });

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        this.selectionArea = layer.getBounds().toBBoxString();
        const coordWGS = this.selectionArea.split(',');
        const coord1LAMB = this.convertWGSToLamb([parseFloat(coordWGS[0]), parseFloat(coordWGS[1])]);
        const coord2LAMB = this.convertWGSToLamb([parseFloat(coordWGS[2]), parseFloat(coordWGS[3])]);
        this.$emit("bboxSelectionArea", coord1LAMB.concat(coord2LAMB));
        drawnItems.addLayer(layer).addTo(map);
        this.layerManager.addOverlay(drawnItems, "Selection");
      });
    },
    setupResults (map) {
      Object.keys(this.categories).forEach(category => {
        this.layerResearchedElements.addLayer(this.categories[category].layer);
      });
      
      this.layerResearchedElements.addTo(map);
    },
    setupQueryLayers() {
      const newQuery = { name: "newQuery" };
      Object.keys(this.categories).forEach(category => {
        newQuery[category] = L.featureGroup();
      });
      this.layerByQuery.push(newQuery);
    },
    setupProj4() {
      proj4.defs([
      [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees +no_defs'],
      [
        'EPSG:2154',
        '+title=LAMB 93 +proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
      ]);
    },
    displayResult(map) { 
      this.setupQueryLayers();
      this.queryResultMap.forEach(element => {
        const keys = Object.keys(element);
        if (keys.includes("wkt")
            && element.wkt.type == "literal") {
          this.displayResultWkt(element, map);
        } else if (keys.includes("lat")
                  && element.lat.type == "literal"
                  && keys.includes("lng")
                  && element.lng.type == "literal") {
          this.displayResultGeo(element, map);
        }
      })
      this.checkFitBounds(map);
    },
    displayResultGeo(element, map) {
      const category = this.determineCategory(element.category.value);
      if (element.lat.value[0].includes("°")) {
        const lat = this.convertDegreeToLatlng(element.lat.value[0]);
        const lng = this.convertDegreeToLatlng(element.lng.value[0]);
        this.displayElement([lat, lng], element, category, map);
      } else {
        this.displayElement(
          [parseFloat(element.lat.value[0]), parseFloat(element.lng.value[0])],
          element, category, map);
      }
    },
    displayResultWkt(element, map) {
      const upperCoord = element.wkt.value[0].toUpperCase();
      let coord = this.checkEPSGWkt(element.wkt.value[0]);
      if (coord) {
        const category = this.determineCategory(element.category.value);
        if (upperCoord.includes("POINT")) {
          const coords = this.extractCoordPointWkt(coord.value, coord.epsg);
          this.displayElement(coords, element, category, map);
        } else if (upperCoord.includes("LINESTRING")) {
          let coords = [];
          if (upperCoord.includes("MULTILINESTRING")) {
            coords = this.extractCoordMultiLineWkt(coord.value, coord.epsg);
          } else {
            coords = this.extractCoordLineWkt(coord.value, coord.epsg);
          }
          this.displayLineElement(coords, element, category, map);
        } else if (upperCoord.includes("POLYGON")) {
          let coords = [];
          if (upperCoord.includes("MULTIPOLYGON")) {
            coords = this.extractCoordPolygonWkt(coord.value, coord.epsg);
          } else {
            coords = this.extractCoordMultiLineWkt(coord.value, coord.epsg);
          }
          this.displayPolygonElement(coords, element, category, map);
        }
      }
    },
    extractCoordPointWkt(coord, epsg) {
      coord = coord.replace(/^ /i, "").replace(' (', "(").split(" ");

      let lng = parseFloat(coord[0].split("(")[coord[0].includes("(") ? 1 : 0]);
      let lat = parseFloat(coord[1].split(")")[0]);

      if (epsg == 2154) {
        const coords = this.convertLambToWGS([lng, lat]);
        lat = coords[1];
        lng = coords[0];
      }

      return [lat, lng];
    },
    extractCoordLineWkt(coord, epsg, poly=false) {
      coord = coord.split("(")[coord.includes("(") ? 1 : 0].split(")")[0].split(",");
      const listPoints = [];
      
      for (let k = 0; k < coord.length - (poly ? 1 : 0); k++) {    
        listPoints.push(this.extractCoordPointWkt(coord[k], epsg));
      }
      return listPoints;
    },
    extractCoordMultiLineWkt(coord, epsg, poly=false) {
      coord = coord.split("((")[coord.includes("((") ? 1 : 0].split("))")[0].split("),(");
      const listCoords = [];

      for (let k = 0; k < coord.length; k++) {
        listCoords.push(this.extractCoordLineWkt(coord[k], epsg, poly));
      }
      return listCoords;
    },
    extractCoordPolygonWkt(coord, epsg) {
      coord = coord.split("(((")[1].split(")))")[0].split(")),((");
      const listPoints = [];

      for (let k = 0; k < coord.length; k++) {
        listPoints.push(this.extractCoordMultiLineWkt(coord[k], epsg, true));
      }
      return listPoints;
    },
    displayElement(coord, element, category, map) {
      switch (category.title) {
        case "amer":
          this.createMarker(
            coord, "amer", [38, 50],
            element, category, map
          );
          break;
        case "domaineMaritime":
          this.createMarker(
            coord, "maritime", [40, 40],
            element, category, map
          );
          break;
        case "phenomenon":
          this.createMarker(
            coord, "phenomenon", [60, 30],
            element, category, map
          );
          break;
        default:
          this.createMarker(
            coord, "default", [50, 40],
            element, category, map
          );
      }
    },
    createMarker(coord, iconName, iconSize, element, layers, map) {
      const icon = L.icon({iconUrl: "markerIcons/" + iconName + ".png", iconSize: iconSize});
      const marker = L.marker(coord, {icon: icon});

      this.createPopup(marker, element);
      this.handleLayers(layers, marker, map);
    },
    displayLineElement(coords, element, layers, map) {
      const line = L.polyline(coords);

      this.createPopup(line, element);
      this.handleLayers(layers, line, map);
    },
    displayPolygonElement(coords, element, layers, map) {
      const polygone = L.polygon(coords);

      this.createPopup(polygone, element);
      this.handleLayers(layers, polygone, map);
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
    handleLayers(layers, symbol, map){
      layers.layer.addLayer(symbol);
      this.addQueryToGlobal(layers.globalLayer, layers.layer);
      this.addResearchToLayerControl(layers.globalLayer, layers.label, map);
    },
    addQueryToGlobal(globalLayer, queryLayer) {
      if (!globalLayer.hasLayer(queryLayer)) {
        globalLayer.addLayer(queryLayer);
      }
    },
    addResearchToLayerControl(layer, name, map) {
      if (!this.layersManaged.hasLayer(layer)) {
        layer.addTo(map);
        this.layersManaged.addLayer(layer);
        this.layerManager.addOverlay(layer, name);
      }
    },
    clearResearchLayer() {
      this.layerResearchedElements.eachLayer((layer) => {
        layer.clearLayers();
        if (this.layersManaged.hasLayer(layer)) {
          this.layersManaged.removeLayer(layer);
          this.layerManager.removeLayer(layer);
        }
      })
      this.queries = [];
    },
    selectQueryByName(name) {
      let index = null;
      this.layerByQuery.forEach((query, i) => {
        if (query.name == name) {
          index = i;
        }
      });
      return index;
    },
    RemoveElementFromArray(array, index) {
      array.splice(index, 1);
      return array;
    },
    handleDisplayQuery(index, state, map) {
      const query = this.layerByQuery[index];
      Object.keys(query).forEach(layer => {
        if (layer != "name") {
          state ? query[layer].addTo(map) : query[layer].remove();
        }
      })
    },
    determineCategory(categories) {
      const selectedCategory = {
        title: "default",
        label: this.categories.default.label,
        globalLayer: this.categories.default.layer,
        layer: this.layerByQuery[this.lastQuery].default
      };

      Object.keys(this.categories).forEach(category => {
        const categoryData = this.categories[category];
        for (const url of categoryData.urls) {
          if (categories.includes(url)) {
            selectedCategory["title"] = category;
            selectedCategory["label"] = categoryData.label;
            selectedCategory['globalLayer'] = categoryData.layer;
            selectedCategory['layer'] = this.layerByQuery[this.lastQuery][category];
            break;
          }
        }
      });
      return selectedCategory;
    },
    checkFitBounds(map) {
      this.layerResearchedElements.eachLayer((layer) => {
        if (layer.getLayers().length > 0) {
          map.fitBounds(this.layerResearchedElements.getBounds(), {animate: false});
          map.setZoom(map.getZoom()-1);
          return;
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
    checkEPSGWkt(coord) {
      const coordCrs = {};
      coord = coord.split("> ");

      if (coord[0].includes("4326") || coord[0].includes("WGS84")) {
        coordCrs["epsg"] = 4326;
        coordCrs["value"] = coord[1];
      } else if (coord[0].includes("2154") || coord[0].includes("LAMB93")) {
        coordCrs["epsg"] = 2154;
        coordCrs["value"] = coord[1];
      } else if (coord.length == 1) {
        coordCrs["epsg"] = 2154;
        coordCrs["value"] = coord[0];
      } else {
        return;
      }
      return coordCrs;
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
    },
    convertWGSToLamb(coord) {
      
      coord = proj4('EPSG:4326', 'EPSG:2154', coord);

      return coord;
    },
    convertLambToWGS(coord) {
      
      coord = proj4('EPSG:2154', 'EPSG:4326', coord);

      return coord;
    },
  },
  computed: {
    getUrl () {
      return "https://" + this.login + ":" + this.pwd.replace("@", "%40") + "@" + this.url;
    },
    lastQuery () {
      return this.layerByQuery.length - 1;
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
.map , .divMap{
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
