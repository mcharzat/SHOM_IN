<template>
    <button id="pdfManager" class="pdfManager">
      <img src="../assets/texte.png" height ="30" width="30"/>
    </button>
    <div id='mySidepanel'></div>
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
    this.docSidePanel = document.getElementById("mySidepanel");
  },
  methods : {
    actionSidePanel() {
      if (this.infSidePanel == false) {
        console.log('rangement du panel');
        this.docSidePanel.style.width = "250px";
        this.pdfManager.style.right = "250px";
        this.infSidePanel = true;
      } else {
        console.log('sortie du panel');
        this.docSidePanel.style.width = "0px";
        this.pdfManager.style.right = "5px";
        this.infSidePanel = false;
      }
    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pdfManager {
  height: 50px;
  width: 50px;
}

.pdfManager {
  position: absolute;
  top: 100px;
  right: 5px;
  z-index: 25;
  
  background-color:white;

  border:solid;
  border-color: white;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

#mySidepanel {
  position: absolute;
  background-color: beige;
  height: 100%;
  right: 0px;
  top : 70px;
  z-index: 1000;
}
</style>