<template>
    <div id="research" class="research">
      <QuerySPARQL />
    </div>
</template>

<script>
import QuerySPARQL from './queryComponents/QuerySPARQL.vue'

export default {
  name: 'SPARQLResearch',
  components: {
      QuerySPARQL
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#research {
  height: 100px;
  width: 50%;
}

.research {
    position: absolute;
    top: 100px;
    left: 100px;
    z-index: 25;
}
</style>