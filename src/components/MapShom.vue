<template>
    <div id="map" class="map" @mouseout.prevent="removeCoord"></div>
    <div id="mouseTracker">
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
      onMap: true,
    }
  },
  mounted() {
    // Leaflet
    const map = L.map('map', {
      zoomControl: false
    }).setView([47.9759965,-5.2963814], 8);

    L.control.zoom({
      position: 'bottomright'
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
    map.on('mousemove', this.getUserPosition, this);
  },
  methods: {
    getUserPosition(pos) {
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
        return "( "+this.userLocation.lat+" , "+this.userLocation.lng+" )";
      }
      return "Mouse is not over map";
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  height: 100%;
  width: 100%;
  z-index: 0;
}
#mouseTracker{
  width:300px;
  height:35px;
  position: fixed;
  bottom: 0px;
  right: 100px;
}
#mouseTracker p{
  background: white;
  opacity: 85%;
}
</style>
