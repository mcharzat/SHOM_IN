<template>
  <div class="containerAppa">
    <NavBar />
    <MapShom
      :queryResultMap="result"
      :updateNameQuery="rename"
      :stateDisplayQuery="stateDisplay"
      :removeTheQuery="queryToRemove"
      :demandReset="resetSignal"
      @bboxSelectionArea="conveyBbox"
      @suppressBboxSelectionArea="conveyStateBbox"
    />
    <DisplayResearch 
      :stateHistory="stateHistory"
      :queryResult="resultDisplay"
      :refresh="demandRefresh"
      @resultOpenState="updatedResultState"
      @pageOuvrage="conveyPageOuvrage"
    />
    <PDFManager 
      :pageOuvrage="pageOuvrage"
    />
    <DisplayQueries
      :stateResult="stateResult"
      :queryResult="result"
      @historyOpenState="updatedHistoryState"
      @nameUpdated="updateQueryName"
      @stateDisplayQuery="conveyStateDisplay"
      @refreshDisplayResult="conveyRefreshResult"
      @removeQuery="conveyRemoveQuery"
      @resetQueries="conveyReset"
    />
    <SPARQLResearch 
      :widthResult="stateResult || stateHistory"
      :bboxArea="bbox"
      :bboxState="bboxState"
      @sparnaResult="conveyResult"
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

export default {
  name: 'App',
  data() {
    return {
      demandRefresh: null,
      stateResult: false,
      stateHistory: false,
      rename: {},
      stateDisplay: {},
      result: [],
      resultDisplay: [],
      bbox: [],
      bboxState: "",
      pageOuvrage: "",
      queryToRemove: {},
      resetSignal: 0,
    }
  },
  methods: {
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
      this.resultDisplay = [];
      this.resetSignal = Date.now();
    },
  },
  components: {
    NavBar,
    MapShom,
    SPARQLResearch,
    DisplayResearch,
    DisplayQueries,
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
