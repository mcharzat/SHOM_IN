<template>
    <div id="map" class="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: 'MapShom',
  mounted() {
    // Leaflet
    const map = L.map('map', {
      zoomControl: false
    }).setView([46.10370875, -7.7], 7);

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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
