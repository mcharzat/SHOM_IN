<template>
    <div class="map" @mouseout.prevent="removeCoord" ref="Shom_IN"></div>
    <div class="mouseTracker">
        <p>{{ coordinate }}</p>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: 'MapShom',
  data() {
    return {
      userLocation: {},
      onMap: false,
    }
  },
  mounted() {
    // Leaflet
    const map = L.map(this.$refs['Shom_IN'], {
      zoomControl: false,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 250,
      attributionControl: false
    }).setView([46.50370875, -10.5], 6.5);
     
    L.control.scale({
      position: 'bottomright',
      imperial: false
    }).addTo(map);

    L.control.zoom({
      position: 'bottomright',
    }).addTo(map);

    const tile = L.tileLayer.wms(
      'https://masterTSI:fx7Hvd7J2BZF%40C@shom.wms.geomod.fr/KARMOR_MAP_SERVICES/wms',
      {
        layers: 'base',
        format: 'image/png',
      }
    );
    tile.addTo(map);
    //Connexion à la fonction au déplacement de la souris
    map.on('mousemove', this.getMousePosition, this);
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map {
  height: 100%;
  width: 100%;
  z-index: 0;
}

.mouseTracker{
  width:330px;
  height:34px;
  position: fixed;
  bottom: 1px;
  right: 100px;
}

.mouseTracker p{
  background: white;
  opacity: 60%;
  padding: 2px;
  height:12.5px;
  font-size: 0.8em;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 0 solid white;
}
</style>
