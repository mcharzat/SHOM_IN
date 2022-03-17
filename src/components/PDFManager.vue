<template>
    <button id="pdfManager" class="pdfManager"></button>
    <div id='pdfSidepanel'></div>
</template>

<script>
export default {
  name: 'PDFManager',
  data() {
    return {
      infSidePanel: false,
      docSidePanel:null,
      pdfManager:null
    }
  },
  mounted() {
    this.pdfManager = document.getElementById('pdfManager');
    this.pdfManager.addEventListener("click", this.actionSidePanel);
    this.docSidePanel = document.getElementById("pdfSidepanel");
    this.viewport_height = window.innerHeight;
  },
  methods : {
    actionSidePanel() {
      if (this.infSidePanel == false) {
        this.docSidePanel.style.width = "250px";
        this.docSidePanel.style.height = "600px";
        this.pdfManager.style.right = "250px";
        this.infSidePanel = true;
      } else {
        this.docSidePanel.style.width = "0px";
        this.pdfManager.style.right = "0px";
        this.infSidePanel = false;
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pdfManager {
  height: 100px;
  width: 100px;
}

.pdfManager {
  position: absolute;
  top: 100px;
  right: 0px;
  z-index: 25;
  
  background: url(../assets/texte.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-color:lightblue;

  border:solid;
  border-color: #076E8C;
  border-width: 2.5px;
}

#pdfSidepanel {
  position: absolute;
  background-color: beige;
  right: 0px;
  top : 100px;
  z-index: 1000;
}
</style>