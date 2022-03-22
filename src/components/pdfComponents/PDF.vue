<template>
  <div>
    <h1>File</h1>

    <PDFViewer
      :source="url"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import PDFViewer from 'pdf-viewer-vue'

// OR THE FOLLOWING IMPORT FOR VUE 2
// import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'

export default {
  components: {
    PDFViewer,
  },

  data() {
    return {
      url: '../../assets/C22.pdf',
    }
  },
}
</script>