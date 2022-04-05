<template>
    <button :class="{pdfManager: true, pdfManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/pdf.png" height ="34" width="34"/>
    </button>
    <div v-if="moveSidePanel" class="pdfSidepanelOpen">
      <MenuPdf class="menuPdfContainer"
        :menuOpen="menuOpen"
        :pageOuvrage="pageOuvrage"
        @openButtonMenu="conveyMenuButton"
      />
    </div>
</template>

<script>
import MenuPdf from './menuPdfComponents/MenuPdf.vue'

export default {
  name: 'PDFManager',
  emits: ['pdfOpenState', 'openMenuButton'],
  components: {
    MenuPdf,
  },
  props: {
    menuOpen:  {
      type: Boolean,
      default: true
    },
    pageOuvrage:  {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      moveSidePanel: false,
    }
  },
  methods: {
    conveyMenuButton (state) {
      this.$emit('openMenuButton', state);
    },
    actionSidePanel() {
      this.moveSidePanel = !this.moveSidePanel;
      this.$emit('pdfOpenState', this.moveSidePanel);
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
