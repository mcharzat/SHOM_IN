<template>
  <button :class="{researchManager: true, researchManagerOpen: widthResult}" @click="actionResearchPanel">
    <img src="../assets/research.png" height ="35" width="35"/>
  </button>
  <div class="research" :hidden="!isDisplayed">
    <QuerySPARQL 
      :coordsBboxArea="bboxArea"
      :suppressBbox="bboxState"
      @myQueryResult="conveyResult"
      />
  </div>
</template>

<script>
/**
 * @module sparqlResearch
 * @vue-event {Array} sparnaResult - Results of the research
 * @vue-prop {Boolean} [widthResult=false] - State of the display of result/history component
 * @vue-prop {Array} [bboxArea=[]] - Bbox of the selection
 * @vue-prop {String} [bboxState=""] - Wether to use the selection
 * @vue-data {Boolean} [isDisplayed=true] - Wether the content of the component is displayed
 */
import QuerySPARQL from './queryComponents/QuerySPARQL.vue'

export default {
  name: 'SPARQLResearch',
  emits: ['sparnaResult'],
  components: {
      QuerySPARQL
  },
  props: {
    widthResult:  {
      type: Boolean,
      default: false
    },
    bboxArea: {
      type: Array,
      default: () => []
    },
    bboxState: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isDisplayed: true
    }
  },
  methods: {
    /**
     * Update isDisplayed
     */
    actionResearchPanel() {
      this.isDisplayed = !this.isDisplayed;
    },
    /**
     * Convey the signal
     * @param {Array} result - Results of the research
     * @emits sparnaResult
     */
    conveyResult (result) {
      this.$emit('sparnaResult', result);
    }
  },
}
</script>

<style scoped>
.researchManager {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 100px;
  left: 5px;
  z-index: 35;
  
  background-color:white;
  border:solid;
  border-color: white;
  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.research {
  position: absolute;
  height: 100px;
  width: 70%;
  top: 100px;
  left: 50px;
  z-index: 25;
}

.researchManagerOpen {
  left: calc(33% + 10px)
}
</style>