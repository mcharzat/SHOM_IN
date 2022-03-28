<template>
  <div class="container">
    <NavBar />
    <MapShom />
    <DisplayResearch 
      :queryResult="result"
    />
    <PDFManager @pdfOpenState="updatedPdfState"/>
    <SPARQLResearch 
      :widthPdf="widthPdf"
      @sparnaResult="conveyResult"
    />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MapShom from './components/MapShom.vue'
import SPARQLResearch from './components/SPARQLResearch.vue'
import DisplayResearch from './components/DisplayResearch.vue'
import PDFManager from './components/PDFManager.vue'

export default {
  name: 'App',
  data() {
    return {
      widthPdf: false,
      result: {}
    }
  },
  methods: {
    updatedPdfState: function(width) {
      this.widthPdf = width;
    },
    conveyResult (result) {
      this.result = result;
    }
  },
  components: {
    NavBar,
    MapShom,
    SPARQLResearch,
    DisplayResearch,
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

  .swal2-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background: #076E8C;
  }

  .swal2-popup {
    color: #076E8C;
  }

  .swal2-confirm {
    background-color: #076E8C !important;
  }
</style>
