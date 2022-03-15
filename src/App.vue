<template>
  <div class="container">
    <NavBar />
    <MapShom />
    <SPARQLResearch />
    <SwitchButton />
    <LayerManager />
    <PDFManager />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MapShom from './components/MapShom.vue'
import SPARQLResearch from './components/SPARQLResearch.vue'
import SwitchButton from './components/SwitchButton.vue'
import LayerManager from './components/LayerManager.vue'
import PDFManager from './components/PDFManager.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    MapShom,
    SPARQLResearch,
    SwitchButton,
    LayerManager,
    PDFManager
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
  height: 100%;
  width: 100%;
}
</style>
