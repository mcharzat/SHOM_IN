<template>
  <div class="divSize">
    <iframe class="divSize" frameborder="0" :src="getFilePath"></iframe>
  </div>
</template>

<script>
/**
 * @module pdf
 * @vue-prop {Array} [pageOuvrage=[]] - Default file and page to display
 * @vue-data {String} [path=lib/pdfloader/web/viewer.html] - Path to the library that display the pdf
 * @vue-computed {String} getFilePath - Path to the pdf to display
 */
export default {
  name: "PDF",
  props: {
    pageOuvrage:  {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      path: 'lib/pdfloader/web/viewer.html'
    }
  },
  computed:{
    getFilePath() {
      return this.path +'?file=./pdfFiles/' + this.changePage();
    }
  },
  methods: {
    /**
     * Transform the property pageOuvrage
     * @return {String} Parameters of the path
     */
    changePage() {
      return this.pageOuvrage[0] + ".pdf#page=" + this.pageOuvrage[1];
    }
  }
}

</script>

<style scoped>

.divSize {
  height: 100%;
  width: 100%;
}

</style>