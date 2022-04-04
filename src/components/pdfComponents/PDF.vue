<template>
  <div class="divSize">
    <iframe class="divSize" frameborder="0" :src="getFilePath"></iframe>
  </div>
</template>

<script>

export default {
  name: "PDF",
  props: {
    pageOuvrage:  {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      name: 'C22', //change which pdf file loads
      path: 'lib/pdfloader/web/viewer.html' 
    }
  },
  computed:{
    getFilePath() {
      return this.path +'?file=' + this.changePage();
    }
  },
  methods: {
    changePage() {
      return (this.pageOuvrage[0] ? this.pageOuvrage[0] : this.name) + ".pdf#page=" + this.pageOuvrage[1];
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