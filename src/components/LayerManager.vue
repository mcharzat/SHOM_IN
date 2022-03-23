<template>
    <button :class="{layerManager: true, layerManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/layers.png" height ="30" width="30"/>
    </button>
    <div v-if="moveSidePanel" class="layerSidepanelOpen"></div>
</template>

<script>
export default {
  name: 'LayerManager',
  data() {
    return {
      infSidePanel: false,
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

.layerManager {
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

.layerManagerOpen {
  left: calc(33% + 10px);
}

.layerSidepanelOpen {
  position: absolute;
  background-color: beige;
  left: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 125px);
  top : 100px;
  z-index: 1000;
}
</style>