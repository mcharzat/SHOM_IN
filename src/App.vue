<template>
  <div class="containerAppa">
    <NavBar />
    <MapShom
      :queryResultMap="result"
      :updateNameQuery="rename"
      :stateDisplay="stateDisplay"
      :removeTheQuery="queryToRemove"
      :demandReset="resetSignal"
      :uploadedQueries="uploadedQueries"
      @bboxSelectionArea="conveyBbox"
      @suppressBboxSelectionArea="conveyStateBbox"
      @layersToManage="conveyToManage"
      @layersLabel="conveyLabels"
    />
    <SPARQLResearch 
      :widthResult="stateResult || stateHistory"
      :bboxArea="bbox"
      :bboxState="bboxState"
      @sparnaResult="conveyResult"
    />
    <DisplayResearch 
      :stateHistory="stateHistory"
      :queryResult="resultDisplay"
      :refresh="demandRefresh"
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
      :buttonMenuState="buttonMenu"
      @openMenu="backToMenu"
    />
    <DisplayQueries
      :stateResult="stateResult"
      :queryResult="result"
      :layersList="toManaged"
      :layersLabel="labels"
      @historyOpenState="updatedHistoryState"
      @nameUpdated="updateQueryName"
      @stateDisplay="conveyStateDisplay"
      @refreshDisplayResult="conveyRefreshResult"
      @removeQuery="conveyRemoveQuery"
      @resetQueries="conveyReset"
      @uploadedQueries="conveyUploadedQueries"
    />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MapShom from './components/MapShom.vue'
import SPARQLResearch from './components/SPARQLResearch.vue'
import DisplayResearch from './components/DisplayResearch.vue'
import DisplayQueries from './components/DisplayQueries.vue'
import PDFManager from './components/PDFManager.vue'
import BackMenu from './components/BackMenu.vue'

export default {
  name: 'App',
  data() {
    return {
      widthPdf: false,
      demandRefresh: null,
      stateResult: false,
      stateHistory: false,
      rename: {},
      stateDisplay: {},
      result: [],
      resultDisplay: [],
      bbox: [],
      bboxState: "",
      pageOuvrage: [],
      menuOpen: false,
      buttonMenu: false,
      queryToRemove: {},
      resetSignal: 0,
      uploadedQueries: {},
      toManaged: {},
      labels: {},
    }
  },
  methods: {
    conveyOpenMenuButton() {
      this.buttonMenu = !this.buttonMenu;
    },
    backToMenu() {
      this.menuOpen = !this.menuOpen;
    },
    updatedResultState: function(state) {
      this.stateResult = state;
    },
    updatedHistoryState: function(state) {
      this.stateHistory = state;
    },
    updateQueryName(renameData) {
      this.rename = renameData;
    },
    conveyStateDisplay(stateDisplay) {
      this.stateDisplay = stateDisplay;
    },
    updatedPdfState(width) {
      this.widthPdf = width;
    },
    conveyResult (result) {
      this.result = this.resultDisplay = result;
    },
    conveyRefreshResult (result) {
      this.resultDisplay = result;
      this.demandRefresh = Date.now()
    },
    conveyBbox (bbox) {
      this.bbox = bbox;
    },
    conveyStateBbox (bboxState) {
      this.bboxState = bboxState;
    },
    conveyPageOuvrage (pageOuvrage) {
      this.pageOuvrage = pageOuvrage;
    },
    conveyRemoveQuery(name) {
      this.queryToRemove = name;
    },
    conveyReset() {
      this.resetSignal = Date.now();
    },
    conveyUploadedQueries(queries) {
      this.uploadedQueries = queries;
    },
    conveyToManage(layers) {
      this.toManaged = layers;
    },
    conveyLabels(labels) {
      this.labels = labels;
    }
  },
  components: {
    NavBar,
    MapShom,
    SPARQLResearch,
    DisplayResearch,
    PDFManager,
    BackMenu,
    DisplayQueries
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
