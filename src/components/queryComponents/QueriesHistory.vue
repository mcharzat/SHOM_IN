<template>
  <div class="myQuery">
      <input type="checkbox" v-model="displayedMap">
      <div v-if="stateNameEdition" class="name" @dblclick="editionMode">
          <p> {{ nameQuery }} </p>
      </div>
      <div v-else>
          <input type="text" v-model="newName" ref="rename"
          @keypress.enter="submitRename" @keydown.esc="cancelRename"
          @focusout="cancelRename">
      </div>
      <button class="buttons" @click="displayResult">Afficher les résultats</button>
      <button class="buttons" @click="removeQuery">x</button>
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
    watch: {
        displayedMap: function () {
            this.displayMap();
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
            const data = {
                name: this.nameQuery,
                state: this.displayedMap
            }
            this.$emit('displayQueryMap', data);
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
    align-content: center;
    justify-content: space-between;

    border-radius: 5px;

    margin: 2px 5px 2px 15px;
}

.name {
    display: flex;
    align-content: center;
}

.name p{
    display: flex;
    align-self: center;
}

.buttons {
    min-width: 35px;
    min-height: 35px;

    border-radius: 5px;
}
</style>