<template>
  <div class="menu">
      <PDF class="pdfContainer"/>
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
  }
}

</script>

<style scoped>

.pdfContainer {
  height: 100%;
  width: 100%;
}
</style>