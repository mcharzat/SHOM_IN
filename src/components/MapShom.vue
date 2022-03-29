<template>
    <div class="map" @mouseout.prevent="removeCoord" ref="Shom_IN"></div>
    <div class="mouseTracker">
        <p>{{ coordinate }}</p>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet';
import "leaflet-draw";

export default {
  name: 'MapShom',
  data() {
    return {
      url: "https://masterTSI:fx7Hvd7J2BZF%40C@shom.wms.geomod.fr/KARMOR_MAP_SERVICES/wms",
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
      userLocation: {},
      onMap: false,
      selectionArea: "",
      layerManager : L.control.layers(),
      layersManaged : L.layerGroup(),
    }
  },
  mounted() {
    // Leaflet
    const map = this.setupMap();
    this.setupControls(map);
    this.setupSelectArea(map);

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
          this.url,
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
    getMousePosition(pos) {
      this.onMap=true;
      this.userLocation = {
        lat: pos.latlng.lat.toFixed(10),
        lng: pos.latlng.lng.toFixed(10),
      };
    },
    removeCoord() {
      this.onMap=false;
    }
  },
  computed: {
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
