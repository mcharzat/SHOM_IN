<template>
  <button :class="{researchManager: true, researchManagerOpen: moveButton}" @click="actionResearchPanel">
    <img src="../assets/research.png" title="Afficher/masquer l'outil de recherche" height ="35" width="35"/>
  </button>
  <div class="research" :hidden="!displayPanel">
    <QuerySPARQL 
      :coordsBboxArea="bboxArea"
      :suppressBbox="bboxState"
      @myQueryResult="conveyResult"
      />
  </div>
</template>

<script>
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
  computed : {
    displayPanel() {
      return this.isDisplayed;
    },
    moveButton() {
      return this.widthResult != 0;
    }
  },
  methods: {
    actionResearchPanel() {
      this.isDisplayed = !this.isDisplayed;
    },
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
  border-radius: 10%;

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