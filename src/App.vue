<template>
  <div class="container">
    <MapShom />
    <SPARQLResearch />
  </div>
</template>

<script>
import MapShom from './components/MapShom.vue'
import SPARQLResearch from './components/SPARQLResearch.vue'

export default {
  name: 'App',
  components: {
    MapShom,
    SPARQLResearch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.container {
  position: relative;
}
</style>
