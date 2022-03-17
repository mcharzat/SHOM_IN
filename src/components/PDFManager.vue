<template>
    <button :class="{pdfManager: true, pdfManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/texte.png" height ="30" width="30"/>
    </button>
    <div :class="{pdfSidepanelOpen: moveSidePanel, pdfSidepanel: true}"></div>
</template>

<script>
export default {
  name: 'PDFManager',
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

.pdfManager {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 100px;
  right: 5px;
  z-index: 25;
  
  background-color:white;

  border:solid;
  border-color: white;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.pdfManagerOpen {
  right: calc(33% + 10px);
}

.pdfSidepanel {
  position: absolute;
  background-color: beige;
  right: 0px;
  top : 100px;
  z-index: 1000;
}

.pdfSidepanelOpen {
  right: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 125px);
}
</style>