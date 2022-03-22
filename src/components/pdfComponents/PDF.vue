<template>
  <div>
    <vue-pdf-embed :source="source1" />
  </div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'

export default {
  components: {
    VuePdfEmbed,
  },
  data() {
    return {
      source1: 'C22.pdf',
    }
  },
}
</script>