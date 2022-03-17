<template>
    <button id="layerManager" class="layerManager" onclick='console.log("layerManager")'>
      <img src="../assets/layers.png" height ="30" width="30"/>
    </button>
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
  height: 50px;
  width: 50px;
}

.layerManager {
    position: absolute;
    top: 100px;
    left: 5px;
    z-index: 25;
    
    background-color:white;

    border:solid;
    border-color: white;

    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

#layerSidepanel {
  position: absolute;
  background-color: beige;
  left: 0px;
  top : 100px;
  z-index: 1000;
}
</style>