<template>
  <div>
    <div v-if="openMenu && (pdfName == '')" class="menu">
      Menu
      <ul class="pdfList">
        <button class="pdfEntity" @click="clickPdf">
        pdf1
        </button>
                <button class="pdfEntity" @click="clickPdf">
        pdf2
        </button>
      </ul>
    </div>

    <PDF v-if="(pdfName != '') || openPdf" class="pdfContainer"/>
  </div>
</template>

<script>
import PDF from './pdfComponents/PDF.vue'

export default {
  name: 'MenuPdf',
  components: {
    PDF,
  },
  data () {
    return {
      pdfName: '', // sera recu de quelque part => a écouter
      openMenu: true,
      openPdf: false,
    }
  },
  methods: {
    clickPdf() {
      this.openPdf = true;
      this.openMenu = false;
    },
    namesPdfPresent() {
      if (this.pdfName != '') {
        return true;
      } else
      {return false;}
    }
  },
}

</script>

<style scoped>

.menu {
  padding: 20px;
}

.pdfList {
  padding: 0px;
  display: block;
  justify-content: center;
}

.pdfEntity {
  background-color: #81a9c7; /* ou bleu:#076e8c*/
  border: none;
  color: white;
  padding: 15px 32px;
  margin: 15px;
  text-align: center;
  width: 70%;

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