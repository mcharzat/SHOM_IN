<template>
  <div>
    <div v-if="openMenu && !pageOuvrage.length" class="menu">
      Ouvrages d'instructions nautiques
      <ul class="pdfList">
        <button class="pdfEntity" @click="clickPdf">
        pdf1
        </button>
                <button class="pdfEntity" @click="clickPdf">
        pdf2
        </button>
      </ul>
    </div>

    <PDF v-if="!openMenu && (pageOuvrage.length || openPdf)" class="pdfContainer"
    :pageOuvrage="pageOuvrage"
    />
  </div>
</template>

<script>
import PDF from './pdfComponents/PDF.vue'

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
      openPdf: false
    }
  },
  watch: {
    menuOpen: function () {
      this.openMenu = true;
      this.$emit('openButtonMenu', this.openMenu);
    },
    pageOuvrage: function () {
      this.openMenu = false;
      this.$emit('openButtonMenu', this.openMenu);
    },
  },
  methods: {
    clickPdf() {
      this.openPdf = true;
      this.openMenu = false;
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
  background-color: #81a9c7; /* ou bleu:#076e8c*/
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