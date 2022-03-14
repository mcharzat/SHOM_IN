<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: 'MapShom',
  mounted() {
    // Leaflet
    const map = L.map('map').setView([51.505, -0.09], 7);
    const tile = L.tileLayer.wms(
      'https://masterTSI:fx7Hvd7J2BZF%40C@shom.wms.geomod.fr/KARMOR_MAP_SERVICES/wms',
      {
        layers: 'base',
        format: 'image/png',
      }
    );
    tile.addTo(map);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  position: fixed;
  top: 70px;
  left: 0;
  height: 670px;
  width: 100%;
}
</style>
