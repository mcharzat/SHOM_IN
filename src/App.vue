<template>
  <div class="containerAppa">
    <NavBar />
    <MapShom
      :queryResultMap="result"
      @bboxSelectionArea="conveyBbox"
      @suppressBboxSelectionArea="conveyStateBbox"
    />
    <SPARQLResearch 
      :widthResult="widthResult"
      :bboxArea="bbox"
      :bboxState="bboxState"
      @sparnaResult="conveyResult"
    />
    <DisplayResearch 
      :queryResult="result"
      @resultOpenState="updatedResultState"
      @pageOuvrage="conveyPageOuvrage"
    />
    <PDFManager
      :menuOpen="menuOpen"
      :pageOuvrage="pageOuvrage"
      @pdfOpenState="updatedPdfState"
      @openMenuButton="conveyOpenMenuButton"
    />
    <BackMenu 
      :widthPdf="widthPdf"
      @openMenu="backToMenu"
    />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MapShom from './components/MapShom.vue'
import SPARQLResearch from './components/SPARQLResearch.vue'
import DisplayResearch from './components/DisplayResearch.vue'
import PDFManager from './components/PDFManager.vue'
import BackMenu from './components/BackMenu.vue'

export default {
  name: 'App',
  data() {
    return {
      widthResult: false,
      widthPdf: false,
      result: [],
      bbox: [],
      bboxState: "",
      pageOuvrage: [],
      menuOpen: false,
      buttonMenu: false
    }
  },
  methods: {
    conveyOpenMenuButton() {
      this.buttonMenu = !this.buttonMenu;
    },
    backToMenu() {
      this.menuOpen = !this.menuOpen;
    },
    updatedResultState(width) {
      this.widthResult = width;
    },
    updatedPdfState(width) {
      this.widthPdf = width;
    },
    conveyResult (result) {
      this.result = result;
    },
    conveyBbox (bbox) {
      this.bbox = bbox;
    },
    conveyStateBbox (bboxState) {
      this.bboxState = bboxState;
    },
    conveyPageOuvrage (pageOuvrage) {
      this.pageOuvrage = pageOuvrage;
    }
  },
  components: {
    NavBar,
    MapShom,
    SPARQLResearch,
    DisplayResearch,
    PDFManager,
    BackMenu
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

  .containerAppa {
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
