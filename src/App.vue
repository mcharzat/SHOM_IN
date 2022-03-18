<template>
  <div class="container">
    <NavBar />
    <MapShom />
    <SwitchButton />
    <LayerManager />
    <PDFManager @pdfOpenState="updatedPdfState"/>
    <SPARQLResearch 
      :widthPdf="widthPdf"
    />
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
  data() {
    return {
      widthPdf: false
    }
  },
  methods: {
    updatedPdfState: function(width) {
      this.widthPdf = width;
    }
  },
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
