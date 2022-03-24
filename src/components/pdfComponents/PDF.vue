<template>
  <div class="divSize">
    <iframe class="divSize" :src="getFilePath"></iframe>
  </div>
</template>

<script>

export default {
  name: "PDF",
  data () {
    return {
      name: 'C22.pdf', //change which pdf file loads
      path: 'lib/pdfloader/web/viewer.html' 
    }
  },
  computed:{ 
    getFilePath() {
      return this.path +'?file=' + this.name;
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