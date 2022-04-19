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
/**
 * @module mapShom
 * @vue-event {String} bboxSelectionArea - Bbox of the selection
 * @vue-event {String} suppressBboxSelectionArea - Suppression of the selection is demanded
 * @vue-event {Object} layersToManage - Layers to handle the display on the map
 * @vue-event {Object} layersLabel - Labels of the layers
 * @vue-prop {Array} [queryResultMap=[]] - Results of the research
 * @vue-prop {Object} [uploadedQueries={}] - Queries uploaded
 * @vue-prop {Object} [updateNameQuery={}] - Name of a query to be updated
 * @vue-prop {Object} [stateDisplay={}] - Configuration of the display of layers on map
 * @vue-prop {Object} [removeTheQuery={}] - Remove a query
 * @vue-prop {number} [demandReset=0] - Clear of all queries is demanded
 * @vue-data {String} [url=""] - Url of the wms
 * @vue-data {String} [login=""] - Login for the wms
 * @vue-data {String} [pwd=""] - Password for the wms
 * @vue-data {Array} [wmsLayers=[]] - Alias of the layers in the wms
 * @vue-data {Array} [wmsNames=[]] - Labels of the layers in the wms
 * @vue-data {Object} [layerIndexes={}] - Indexes of the layers in layersManaged
 * @vue-data {Object} [layerToManaged={}] - Layers to handle the display on the map
 * @vue-data {Object} [layerLabels={}] - Labels of the layers
 * @vue-data {Object} [categoriesNames={}] - Names of the categories
 * @vue-data {Object} [categoriesUrls={}] - Uris of the elements in each category
 * @vue-data {Object} [categories={}] - Categories with their layer
 * @vue-data {Array} [dataEntity=[]] - Data of the popup
 * @vue-data {Object} [userLocation={}] - Coordinates of the mouse
 * @vue-data {Boolean} [onMap=false] - Wether the mouse is over the map
 * @vue-data {String} [selectionArea=""] - Bbox of the selection
 * @vue-data {layerGroup} [layersManaged=L.layerGroup] - Base layers
 * @vue-data {featureGroup} [layerResearchedElements=L.featureGroup] - Layers from the researches
 * @vue-data {Array} [layerByQuery=[]] - List of the queries with name and layers
 * @vue-computed {String} getUrl - Retrieve the complete url
 * @vue-computed {Number} lastQuery - Index of the last query
 * @vue-computed {String} coordinate - Coordinates of the mouse
 */
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet';
import "leaflet-draw";
import proj4 from 'proj4';

import EntityResult from "./queryComponents/EntityResult.vue";

export default {
  name: 'MapShom',
  emits: [
    'bboxSelectionArea',
    'suppressBboxSelectionArea',
    'layersToManage',
    'layersLabel'
  ],
  components: {
    EntityResult,
  },
  props: {
    queryResultMap:  {
      type: Array,
      default: () => []
    },
    uploadedQueries:  {
      type: Object,
      default: () => {}
    },
    updateNameQuery:  {
      type: Object,
      default: () => {}
    },
    stateDisplay:  {
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
        "Couche originel",
        "Hydrographie",
        "Sondages",
        "Dangers",
        "Restrictions",
        "Topographie",
        "Aides à la navigation",
        "Metadonnées"
      ],
      layerIndexes: {},
      layerToManaged: {
        content: "categories",
        data: [],
        extra: [],
      },
      layerLabels: {},
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

    this.setupEmits();
  },
  methods: {
    /**
     * Setup the map
     */
    setupMap() {
      return L.map(this.$refs['Shom_IN'], {
        zoomControl: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 250,
        attributionControl: false
      }).setView([46.50370875, -10.5], 6.5);
    },
    /**
     * Setup the controls of the map.
     * @param {L.map} map - The map
     */
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
    /**
     * Setup the base layers controls.
     * @param {L.map} map - The map
     */
    setupLayerControls(map) {
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
          this.layersManaged.addLayer(layer);
          this.layerIndexes[layerName] = this.layersManaged.getLayerId(layer);
          this.layerLabels[layerName] = this.wmsNames[i];
        }
      });
    },
    /**
     * Setup the categories.
     */
    setupCategories() {
      Object.keys(this.categoriesNames).forEach(category => {
        const buildCategory = {
          urls: this.categoriesUrls[category],
          layer: L.featureGroup()
        }
        this.categories[category] = buildCategory;
        this.layerLabels[category] = this.categoriesNames[category];
      })
    },
    /**
     * Setup the listeners on the map.
     * @param {L.map} map - The map
     */
    setupListeners(map) {
      //Connexion à la fonction au déplacement de la souris
      map.on('mousemove', this.getMousePosition, this);
    },
    /**
     * Setup the watchers over the props.
     * @param {L.map} map - The map
     */
    setupWatchers(map) {
      this.$watch('queryResultMap', () => {
        this.setupQueryLayers();
        this.displayResult(this.queryResultMap, map);
      });

      this.$watch('uploadedQueries', () => {
        this.uploadedQueries.queries.forEach(query => {
          this.setupQueryLayers(query.name);
          this.displayResult(query.value, map);
        })
      });

      this.$watch('layerToManaged', () => {
        this.$emit("layersToManage", this.layerToManaged);
      }, {deep: true});

      this.$watch('updateNameQuery', names => {
        const index = this.handleLayersFromOldQuery(names.old);
        this.layerByQuery[index].name = names.new;
        this.handleLayersFromOldQuery(names.new, true);
      });

      this.$watch('stateDisplay', config => {
        this.handleDisplay(config, map);
      });

      this.$watch('removeTheQuery', name => {
        const index = this.handleLayersFromOldQuery(name.name)
        this.layerByQuery = this.removeElementFromArray(this.layerByQuery, index);
        this.cleanCategoriesLayers();
      });

      this.$watch('demandReset', () => {
        this.clearResearchLayer();
        this.cleanCategoriesLayers();
        this.layerByQuery = [];
      });
    },
    /**
     * Setup the selection over the map.
     * @param {L.map} map - The map
     */
    setupSelectArea(map) {
      const drawnItems = L.featureGroup().addTo(map);
      this.layersManaged.addLayer(drawnItems);
      this.layerIndexes["selection"] = this.layersManaged.getLayerId(drawnItems);

      L.drawLocal.draw.toolbar.buttons.rectangle = 'Sélectionner une emprise';
      L.drawLocal.draw.toolbar.actions.title = 'Annuler la sélection';
      L.drawLocal.draw.toolbar.actions.text = 'Annuler';
      L.drawLocal.draw.handlers.rectangle.tooltip.start = "Click et drag pour dessiner l'emprise";
      L.drawLocal.draw.handlers.simpleshape.tooltip.end = "Relâcher pour terminer la sélection";
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
        const index = this.layerToManaged.extra.indexOf("selection");
        this.layerToManaged.extra = this.removeElementFromArray(this.layerToManaged.extra, index);
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
        this.layerToManaged.extra.push("selection");
      });
      this.layerLabels["selection"] = "Sélection";
    },
    /**
     * Setup the results layers.
     * @param {L.map} map - The map
     */
    setupResults (map) {
      Object.keys(this.categories).forEach(category => {
        this.layerResearchedElements.addLayer(this.categories[category].layer);
      });
      
      this.layerResearchedElements.addTo(map);
    },

    /**
     * Setup the new query.
     * @param {String} [queryName=newQuery] - The name of the query
     */
    setupQueryLayers(queryName = "newQuery") {
      const newQuery = { name: queryName };
      Object.keys(this.categories).forEach(category => {
        newQuery[category] = L.featureGroup();
      });
      this.layerByQuery.push(newQuery);
    },
    /**
     * Setup the projection library.
     */
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
    /**
     * Emits of the setup of layers.
     * @emits layersToManage
     * @emits layersLabel
     */
    setupEmits() {
      this.$emit("layersToManage", {
        content: "base",
        data: Object.keys(this.layerIndexes),
      });
      this.$emit("layersLabel", this.layerLabels);
    },
    /**
     * Check the presence of coordinates field.
     * @param {Array} query - Result of a query
     * @param {L.map} map - The map
     */
    displayResult(query, map) { 
      query.forEach(element => {
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
    /**
     * Check the type of coordinates of geographic coordinates.
     * @param {Object} element - Data of an entity of the result
     * @param {L.map} map - The map
     */
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
    /**
     * Check the type of geometry of the wkt.
     * @param {Object} element - Data of an entity of the result
     * @param {L.map} map - The map
     */
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
    /**
     * Extract the coordinates of a point from a wkt.
     * @param {Array} coord - Coordinates of the entity
     * @param {Number} epsg - System of coordinates
     * @return {Array} Coordinates of the point
     */
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
    /**
     * Extract the coordinates of a line from a wkt.
     * @param {Array} coord - Coordinates of the entity
     * @param {Number} epsg - System of coordinates
     * @param {Boolean} [poly=false] - Wether the original geometry is a polygon
     * @return {Array} Coordinates of the line
     */
    extractCoordLineWkt(coord, epsg, poly=false) {
      coord = coord.split("(")[coord.includes("(") ? 1 : 0].split(")")[0].split(",");
      const listPoints = [];
      
      for (let k = 0; k < coord.length - (poly ? 1 : 0); k++) {    
        listPoints.push(this.extractCoordPointWkt(coord[k], epsg));
      }
      return listPoints;
    },
    /**
     * Extract the coordinates of a multiline from a wkt.
     * @param {Array} coord - Coordinates of the entity
     * @param {Number} epsg - System of coordinates
     * @param {Boolean} [poly=false] - Wether the original geometry is a polygon
     * @return {Array} Coordinates of the multiline
     */
    extractCoordMultiLineWkt(coord, epsg, poly=false) {
      coord = coord.split("((")[coord.includes("((") ? 1 : 0].split("))")[0].split("),(");
      const listCoords = [];

      for (let k = 0; k < coord.length; k++) {
        listCoords.push(this.extractCoordLineWkt(coord[k], epsg, poly));
      }
      return listCoords;
    },
    /**
     * Extract the coordinates of a polygon from a wkt.
     * @param {Array} coord - Coordinates of the entity
     * @param {Number} epsg - System of coordinates
     * @return {Array} Coordinates of the polygon
     */
    extractCoordPolygonWkt(coord, epsg) {
      coord = coord.split("(((")[1].split(")))")[0].split(")),((");
      const listPoints = [];

      for (let k = 0; k < coord.length; k++) {
        listPoints.push(this.extractCoordMultiLineWkt(coord[k], epsg, true));
      }
      return listPoints;
    },
    /**
     * Define the details of the marker to be displayed.
     * @param {Array} coord - Coordinates of the entity
     * @param {Object} element - Data of the entity
     * @param {Object} category - Category of the entity with layers
     * @param {L.map} map  - The map
     */
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
    /**
     * Create the marker for the entity.
     * @param {Array} coord - Coordinates of the entity
     * @param {String} iconName - Name of the icon of the marker
     * @param {Array} iconSize - Size of the icon of the marker
     * @param {Object} element - Data of the entity
     * @param {Object} layers - Layers of the category of the entity 
     * @param {L.map} map - the map
     */
    createMarker(coord, iconName, iconSize, element, layers, map) {
      const icon = L.icon({iconUrl: "markerIcons/" + iconName + ".png", iconSize: iconSize});
      const marker = L.marker(coord, {icon: icon});

      this.createPopup(marker, element);
      this.handleLayers(layers, marker, map);
    },
    /**
     * Create the line for the entity.
     * @param {Array} coords - Coordinates of the entity
     * @param {Object} element - Data of the entity
     * @param {Object} layers - Layers of the category of the entity
     * @param {L.map} map - the map
     */
    displayLineElement(coords, element, layers, map) {
      const line = L.polyline(coords);

      this.createPopup(line, element);
      this.handleLayers(layers, line, map);
    },
    /**
     * Create the polygone for the entity.
     * @param {Array} coords - Coordinates of the entity
     * @param {Object} element - Data of the entity
     * @param {Object} layers - Layers of the category of the entity
     * @param {L.map} map - the map
     */
    displayPolygonElement(coords, element, layers, map) {
      const polygone = L.polygon(coords);

      this.createPopup(polygone, element);
      this.handleLayers(layers, polygone, map);
    },
    /**
     * Create a popup for the entity.
     * @param {L.feature} symbol - Feature for which the popup is meant
     * @param {Array} element - Data of the entity
     */
    createPopup(symbol, element) {
      symbol.on("click", async () => {
        symbol.unbindPopup();
        this.dataEntity = element;
        await this.$refs["entity"].$.update();
        symbol.bindPopup(this.$refs["entity"].$el.innerHTML);
        symbol.openPopup();
      })
    },
    /**
     * Handle the display of the new entities.
     * @param {Object} layers - Layers of the category of the entity
     * @param {L.Feature} symbol - Feature to be displayed
     * @param {L.map} map - The map
     */
    handleLayers(layers, symbol, map){
      layers.layer.addLayer(symbol);
      this.addQueryToGlobal(layers.globalLayer, layers.layer);
      this.addResearchToLayerControl(layers.globalLayer, layers.title, map);
    },
    /**
     * Handle the layers of a new query.
     * @param {L.layer} globalLayer - Layer of the category
     * @param {L.layer} queryLayer - Layer of the category for the query
     */
    addQueryToGlobal(globalLayer, queryLayer) {
      if (!globalLayer.hasLayer(queryLayer)) {
        globalLayer.addLayer(queryLayer);
      }
    },
    /**
     * Handle the display on the map for a new query.
     * @param {L.layer} layer - Layer that have been filled
     * @param {String} name - Alias of the category
     * @param {*} map - The map
     */
    addResearchToLayerControl(layer, name, map) {
      if (!this.layersManaged.hasLayer(layer)) {
        layer.addTo(map);
        this.layersManaged.addLayer(layer);
        this.layerToManaged.data.push(name);
      }
    },
    /**
     * Empty all layers.
     */
    clearResearchLayer() {
      this.layerResearchedElements.eachLayer((layer) => {
        layer.clearLayers();
        if (this.layersManaged.hasLayer(layer)) {
          this.layersManaged.removeLayer(layer);
        }
      });
      Object.keys(this.categoriesNames).forEach(category => {
        if (this.layerToManaged.data.includes(category)) {
          const index = this.layerToManaged.data.indexOf(category);
          this.layerToManaged.data = this.removeElementFromArray(this.layerToManaged.data, index);
        }
      });
    },
    /**
     * Clean the categories layer of layerToManaged.
     */
    cleanCategoriesLayers() {
      this.layerToManaged.data.forEach( (category, index) => {
        if (this.categories[category].layer.getLayers().length == 0) {
          this.layersManaged.removeLayer(this.categories[category].layer);
          this.layerToManaged.data = this.removeElementFromArray(this.layerToManaged.data, index);
        }
      })
    },
    /**
     * Remove the old queries from layers
     * @param {String} name - Name of the query
     * @param {Boolean} [state=false] - State of the display for the query
     * @return {Number} Index of the query
     */
    handleLayersFromOldQuery(name, state = false) {
      const index = this.selectQueryByName(name);

      Object.values(this.layerToManaged.data).forEach( category => {
        this.handleDisplayQuery(name, category, state);
      })
      return index;
    },
    /**
     * retrieve the index of a query with the name.
     * @param {String} name - Name of the query
     * @return {Number} Index of the query in layerByQuery
     */
    selectQueryByName(name) {
      let index = null;
      this.layerByQuery.forEach((query, i) => {
        if (query.name == name) {
          index = i;
        }
      });
      return index;
    },
    /**
     * Remove an element of an array.
     * @param {Array} array - An array
     * @param {Number} index - Index of the element to remove
     * @return {Array} Array without the unwanted element
     */
    removeElementFromArray(array, index) {
      array.splice(index, 1);
      return array;
    },
    /**
     * Handle the display of layers and queries on the map.
     * @param {Object} config - Configuration of the display property of the layers and the queries
     * @param {L.map} map - The map
     */
    handleDisplay(config, map) {
      Object.keys(config.layers.baseLayers).forEach( layer => {
        this.handleDisplayBaseLayer(layer, config.layers.baseLayers[layer], map);
      })
      Object.keys(config.layers.categoryLayers).forEach( category => {
        this.handleDisplayCategoryLayer(
          category,
          config.layers.categoryLayers[category], 
          config.queries,
          map)
      })
    },
    /**
     * Handle the display of a base layer.
     * @param {String} layerAlias - Alias of the layer
     * @param {Boolean} state - Wether the layer should be displayed
     * @param {L.map} map - The map
     */
    handleDisplayBaseLayer(layerAlias, state, map) {
      const id = this.layerIndexes[layerAlias];
      const layer = this.layersManaged.getLayer(id);
      state ? layer.addTo(map) : layer.remove();
    },
    /**
     * Handle the display of a category layer.
     * @param {String} category - Alias of the layer
     * @param {Boolean} state - Wether the layer should be displayed
     * @param {Array} queries - Queries and their state
     * @param {L.map} map - The map
     */
    handleDisplayCategoryLayer(category, state, queries, map) {
      if (state) {
        this.categories[category].layer.addTo(map);
        queries.forEach( query => {
          this.handleDisplayQuery(query.name, category, query.state);
        })
      } else {
        this.categories[category].layer.remove();
      }
    },
    /**
     * Handle the display of a query.
     * @param {String} queryName - Name of the query
     * @param {Boolean} category - Alias of the category
     * @param {Boolean} state - Wether the query should be displayed
     */
    handleDisplayQuery(queryName, category, state) {
      const index = this.selectQueryByName(queryName);
      if (index != null) {
        const query = this.layerByQuery[index];
        if (query[category].getLayers().length) {
          state ? query[category].addTo(this.categories[category].layer) 
                : this.categories[category].layer.removeLayer(query[category]);
        }
      }
    },
    /**
     * Determine and setup the category of an entity.
     * @param {Object} categories - Url(s) of the category from the query
     * @return {Object} Category with layers
     */
    determineCategory(categories) {
      const selectedCategory = {
        title: "default",
        globalLayer: this.categories.default.layer,
        layer: this.layerByQuery[this.lastQuery].default
      };

      Object.keys(this.categories).forEach(category => {
        const categoryData = this.categories[category];
        for (const url of categoryData.urls) {
          if (categories.includes(url)) {
            selectedCategory["title"] = category;
            selectedCategory['globalLayer'] = categoryData.layer;
            selectedCategory['layer'] = this.layerByQuery[this.lastQuery][category];
            break;
          }
        }
      });
      return selectedCategory;
    },
    /**
     * Zoom on the result.
     * @param {L.map} map - The map
     */
    checkFitBounds(map) {
      this.layerResearchedElements.eachLayer((layer) => {
        if (layer.getLayers().length > 0) {
          map.fitBounds(this.layerResearchedElements.getBounds(), {animate: false});
          map.setZoom(map.getZoom()-1);
          return;
        }
      })
    },
    /**
     * Retrieve the position of the mouse.
     * @param {Object} pos - Data from the event
     */
    getMousePosition(pos) {
      this.onMap=true;
      this.userLocation = {
        lat: pos.latlng.lat.toFixed(10),
        lng: pos.latlng.lng.toFixed(10),
      };
    },
    /**
     * Hide the coordinates of the mouse.
     */
    removeCoord() {
      this.onMap=false;
    },
    /**
     * Check the system of coordinates.
     * @param {String} coord - Coordinates of an entity in wkt
     * @return {Number} System of coordinates
     */
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
    /**
     * Convert coordinates from Degree Minutes to degree latLng.
     * @param {String} coord - Coordinates of an entity
     * @return {String} The converted coordinates
     */
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
    /**
     * Covert coordinates from WGS to Lambert.
     * @param {Array} coord - Coordinatesof an entity
     * @return {Array} The converted coordinates
     */
    convertWGSToLamb(coord) {
      
      coord = proj4('EPSG:4326', 'EPSG:2154', coord);

      return coord;
    },
    /**
     * Covert coordinates from Lambert to WGS.
     * @param {Array} coord - Coordinatesof an entity
     * @return {Array} The converted coordinates
     */
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
      return "La souris n'est pas sur la carte";
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
