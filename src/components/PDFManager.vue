<template>
    <button :class="{pdfManager: true, pdfManagerOpen: moveSidePanel}" @click="actionSidePanel">
      <img src="../assets/pdf.png" title='Afficher le PDF' height ="34" width="34"/>
    </button>
    <div v-if="moveSidePanel" class="pdfSidepanelOpen">

      <div v-if="openMenu" class="menu">
        Ouvrages d'instructions nautiques
        <ul class="pdfList">
          <button class="pdfEntity" v-for="namePdf in allFiles" :key="namePdf" @click="clickPdf(namePdf)">
            {{ namePdf }}
          </button>
        </ul>
      </div>

      <PDF v-if="!openMenu" class="pdfContainer"
        :pageOuvrage="savePageOuvrage"
      />

    </div>
</template>

<script>
/**
 * @module pdfManager
 * @vue-event {Boolean} pdfOpenState - State of the display of the composent
 * @vue-event {Boolean} openMenuButton - Wether the back button should be displayed
 * @vue-prop {Boolean} [menuOpen=true] - Wether the menu is displayed
 * @vue-prop {Array} [pageOuvrage=[]] - File and page to display
 * @vue-data {Boolean} [moveSidePanel=false] - Wether the content of the component is displayed
 * @vue-data {Array} [allFiles=[]] - List of all the pdf
 * @vue-data {Array} [savePageOuvrage=[]] - Save the pdf (and page) displayed
 * @vue-data {Boolean} [openMenu=true] - Wether the content of the menu is displayed
 */
import PDF from './pdfComponents/PDF.vue'
import filesNames from '../../public/lib/pdfloader/web/pdfFiles/pdfFilesNames.json'

export default {
  name: 'PDFManager',
  emits: ['pdfOpenState', 'openMenuButton'],
  components: {
    PDF,
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
      allFiles: filesNames['filesNames'],
      savePageOuvrage: [],
      openMenu: true
    }
  },
  watch: {
    pageOuvrage: function () {
      this.openMenu = false;
      this.$emit('openMenuButton', this.openMenu);
      this.savePageOuvrage = this.pageOuvrage;
    },
    menuOpen: function () {
      this.openMenu = true;
    }
  },
  methods: {
    /**
     * Update moveSidePanel
     * @emits pdfOpenState
     */
    actionSidePanel() {
      this.moveSidePanel = !this.moveSidePanel;
      this.$emit('pdfOpenState', this.moveSidePanel);
    },
    /**
     * Display thepdf asked
     * @param {String} name - Name of the pdf
     * @emits openMenuButton
     */
    clickPdf(name) {
      this.openMenu = false;

      if (name.length == 2) this.savePageOuvrage = name;
      else this.savePageOuvrage = [name, "1"];

      this.$emit('openMenuButton', this.openMenu);

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
  border-radius: 10%;

  box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.pdfManagerOpen {
  right: calc(36% + 10px);
}

.pdfSidepanelOpen {
  position: absolute;
  background-color: rgba(255, 255, 255, 83%);
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

.menu {
  padding-top: 40px;
}

.pdfList {
  padding: 0px;
  display: block;
  justify-content: center;
}

.pdfEntity {
  background-color: rgba(44, 62, 80, 0.8);
  border: none;
  color: white;
  padding: 15px 32px;
  margin: 15px;
  text-align: center;
  width: 50%;

  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.pdfEntity:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.pdfContainer {
  height: 100%;
  width: 100%;
}
</style>
