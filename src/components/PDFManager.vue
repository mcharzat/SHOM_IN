<template>
    <button :class="{pdfManager: true, pdfManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/pdf.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="pdfSidepanelOpen">
      <MenuPdf class="menuPdfContainer" :pageOuvrage="pageOuvrage"/>
    </div>
</template>

<script>
import MenuPdf from './menuPdfComponents/MenuPdf.vue'

export default {
  name: 'PDFManager',
  props: {
    pageOuvrage:  {
      type: Array,
      default: () => []
    }
  },
  components: {
    MenuPdf,
  },
  data() {
    return {
      infSidePanel: false,
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

.pdfManager {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 100px;
  right: 5px;
  z-index: 30;
  
  background-color:white;

  border:solid;
  border-color: white;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.pdfManagerOpen {
  right: calc(36% + 10px);
}

.pdfSidepanelOpen {
  position: absolute;
  background-color: beige;
  right: 5px;
  width: 36%;
  height: 100%;
  max-height: calc(100% - 125px);
  top : 100px;
  z-index: 1000;
  scrollbar-width: none;
  resize: horizontal;
  overflow: auto;
  direction: rtl;
}

.menuPdfContainer {
  height: 100%;
  width: 100%;
}
</style>
