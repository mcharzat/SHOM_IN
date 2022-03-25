<template>
    <button :class="{displayResearch: true, displayResearchOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/results.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="resultSidepanelOpen">
      <h1>Results</h1>
      <EntityResult v-for="(result, i) in data" :values="result" :key="i"></EntityResult>
    </div>
</template>

<script>
import EntityResult from "./queryComponents/EntityResult.vue";

export default {
  name: 'DisplayResearch',
  components : { 
    EntityResult,
  },
  props: {
    queryResult:  {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      infSidePanel: false,
      data: [],
    }
  },
  watch: {
    queryResult: function (results) {
      this.data = results.results.bindings;
    }
  },
  computed : {
    moveSidePanel() {
      return this.infSidePanel;
    }
  },
  methods: {
    actionSidePanel() {
      this.infSidePanel = !this.infSidePanel;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.displayResearch {
    position: absolute;
    height: 50px;
    width: 50px;
    top: 100px;
    left: 5px;
    z-index: 30;
    
    background-color:white;

    border:solid;
    border-color: white;

    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.displayResearchOpen {
  left: calc(33% + 10px);
}

.resultSidepanelOpen {
  position: absolute;
  background-color: rgba(44, 62, 80, 33%);
  left: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 125px);
  top : 100px;
  z-index: 1000;
}
</style>