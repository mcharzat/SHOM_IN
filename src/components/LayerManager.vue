<template>
    <button id="layerManager" class="layerManager"></button>
    <div id='layerSidepanel'></div>
</template>

<script>
export default {
  name: 'LayerManager',
    data() {
    return {
      infSidePanel: false,
      docSidePanel:null,
      layerManager:null
    }
  },
  mounted() {
    this.layerManager = document.getElementById('layerManager');
    this.layerManager.addEventListener("click", this.actionSidePanel);
    this.docSidePanel = document.getElementById("layerSidepanel");
    this.viewport_height = window.innerHeight;
  },
  methods : {
    actionSidePanel() {
      if (this.infSidePanel == false) {
        this.docSidePanel.style.width = "250px";
        this.docSidePanel.style.height = "600px";
        this.layerManager.style.left = "250px";
        this.infSidePanel = true;
      } else {
        this.docSidePanel.style.width = "0px";
        this.layerManager.style.left = "0px";
        this.infSidePanel = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layerManager {
  height: 100px;
  width: 100px;
}

.layerManager {
    position: absolute;
    top: 100px;
    left: 0px;
    z-index: 25;
    
    background: url(../assets/layers.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-color:lightblue;

    border:solid;
    border-color: #076E8C;
    border-width: 2.5px;
}

#layerSidepanel {
  position: absolute;
  background-color: beige;
  left: 0px;
  top : 100px;
  z-index: 1000;
}
</style>