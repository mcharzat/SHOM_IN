<template>
  <div class="myQuery">
      <input type="checkbox" :value="displayedMap" @change="displayMap">
      <div v-if="stateNameEdition" @dblclick="editionMode">
          <p> {{ nameQuery }} </p>
      </div>
      <div v-else>
          <input type="text" v-model="newName" ref="rename"
          @keypress.enter="submitRename" @keydown.esc="cancelRename">
      </div>
      <button @click="displayResult">VR</button>
      <button @click="removeQuery">x</button>
  </div>
</template>

<script>
export default {
    name: "queryHistory",
    emits: ['renameQuery', 'displayQueryMap', 'displayQueryResult', 'removeQuery'],
    props: {
        nameQuery:  {
        type: String,
        default: "Requête"
        },
    },
    data() {
        return {
            displayedMap: true,
            stateNameEdition: true,
            newName: "",
        }
    },
    methods: {
        async editionMode() {
            this.newName = this.nameQuery;
            this.stateNameEdition = !this.stateNameEdition;

            await this.$forceUpdate();
            this.$refs['rename'].focus();
        },
        submitRename() {
            this.stateNameEdition = !this.stateNameEdition;
            this.$emit('renameQuery', this.newName);
        },
        cancelRename() {
            this.stateNameEdition = true;
        },
        displayMap() {
            this.$emit('displayQueryMap', this.displayedMap);
        },
        displayResult() {
            this.$emit('displayQueryResult');
        },
        removeQuery() {
            this.$emit('removeQuery');
        }
    },
}
</script>

<style scoped>
.myQuery {
    display: flex;
    flex-direction: row;

    border-radius: 5px;
}
</style>