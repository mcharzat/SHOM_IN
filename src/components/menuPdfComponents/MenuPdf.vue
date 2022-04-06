<template>
  <div>
    <div v-if="openMenu && !pageOuvrage.length" class="menu">
      Ouvrages d'instructions nautiques
      <ul class="pdfList">
        <button class="pdfEntity" v-for="namePdf in allFiles" :key="namePdf" @click="clickPdf(namePdf)">
          {{ namePdf }}
        </button>
      </ul>
    </div>

    <PDF v-if="!openMenu && (pageOuvrage.length || openPdf)" class="pdfContainer"
      :pageOuvrage="pageOuvrage"
      :name="pdfToOpen"
    />
  </div>
</template>

<script>
import PDF from './pdfComponents/PDF.vue'
import filesNames from '../../../public/lib/pdfloader/web/pdfFiles/pdfFilesNames.json'

export default {
  name: 'MenuPdf',
  emits: ['openButtonMenu'],
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
  data () {
    return {
      openMenu: true,
      openPdf: false,
      allFiles: filesNames['filesNames'],
      pdfToOpen: ""
    }
  },
  watch: {
    menuOpen: function () {
      this.openMenu = true;
      this.$emit('openButtonMenu', this.openMenu);
    },
    pageOuvrage: function () {
      this.openMenu = true;
      this.$emit('openButtonMenu', this.openMenu);
    },
  },
  mounted () {
    this.pdfToOpen = this.allFiles[this.allFiles.length -1];
  },
  methods: {
    clickPdf(name) {
      console.log('coucou');
      console.log(this.allFiles);
      this.openPdf = true;
      this.openMenu = false;
      this.pdfToOpen = name;
      this.$emit('openButtonMenu', this.openMenu);
    },
  },
}

</script>

<style scoped>

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