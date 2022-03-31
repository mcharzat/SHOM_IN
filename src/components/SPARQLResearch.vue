<template>
  <button :class="{researchManager: true, researchManagerOpen: moveButton}" @click="actionResearchPanel">
    <img src="../assets/research.png" height ="35" width="35"/>
  </button>
  <div class="research" :hidden="!displayPanel">
    <QuerySPARQL @myQueryResult="conveyResult"/>
  </div>
</template>

<script>
import QuerySPARQL from './queryComponents/QuerySPARQL.vue'

export default {
  name: 'SPARQLResearch',
  emits: ['sparnaResult','querySent'],
  components: {
      QuerySPARQL
  },
  props: {
    widthPdf:  {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isDisplayed: true,
    }
  },
  computed : {
    displayPanel() {
      return this.isDisplayed;
    },
    moveButton() {
      return this.widthPdf != 0;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.researchManager {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 155px;
  right: 5px;
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
  right: calc(36% + 10px)
}
</style>