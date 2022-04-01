<template>
    <button :class="{pdfManager: true, pdfManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/texte.png" height ="30" width="30"/>
    </button>
    <div v-if="moveSidePanel" class="pdfSidepanelOpen">
      <PDF class="pdfContainer"/>
    </div>
</template>

<script>
import PDF from './pdfComponents/PDF.vue'

export default {
  name: 'PDFManager',
  components: {
    PDF,
  },
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

.pdfContainer {
  height: 100%;
  width: 100%;
}
</style>