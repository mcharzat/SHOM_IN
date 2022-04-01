<template>
    <button :class="{displayResearch: true, displayResearchOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/results.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="resultSidepanelOpen">
      <h1>Results</h1>
      <EntityResult v-for="(result, i) in queryResult" :values="result" :key="i"></EntityResult>
    </div>
</template>

<script>
import EntityResult from "./queryComponents/EntityResult.vue";

export default {
  name: 'DisplayResearch',
  emits: ['resultOpenState'],
  components : { 
    EntityResult,
  },
  props: {
    queryResult:  {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      infSidePanel: false,
    }
  },
  watch: {
    queryResult: function () {
      this.infSidePanel = true;
    },
    infSidePanel: function () {
      this.$emit('resultOpenState', this.infSidePanel);
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

<style scoped>

.displayResearch {
    position: absolute;
    height: 50px;
    width: 50px;
    top: 155px;
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
  background-color: rgba(255, 255, 255, 83%);
  padding-top: 15px;
  left: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 160px);
  top : 100px;
  overflow: scroll;
  z-index: 1000;
}
</style>