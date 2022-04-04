<template>
    <button :class="{backMenu: true, backMenuOpen: moveButton}" @click="backToMenu">
      <img src="../assets/backMenu.png" height ="34" width="34"/>
    </button>
    <div v-if="backToMenu" class="backToMenu">
      <MenuPdf class="menuPdfContainer"/>
    </div>
</template>

<script>
import MenuPdf from './menuPdfComponents/MenuPdf.vue'

export default {
  name: 'BackMenu',
  components: {
    MenuPdf,
  },
  props: {
    widthPdf:  {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed : {
    moveButton() {
      return this.widthPdf != 0;
    }
  },
  methods: {
    backToMenu() {
      console.log('bouton qui doit être supprimé');
    }
  },
}
</script>

<style scoped>

.backMenu {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 155px;
  right: 5px;
  z-index: 30;
  
  background-color:white;

  border:solid;
  border-color: white;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.backMenuOpen {
  right: calc(36% + 10px);
}

.backToMenu {
  padding: 20px;
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