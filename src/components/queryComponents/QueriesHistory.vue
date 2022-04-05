<template>
  <div class="myQuery">
    <input type="checkbox" v-model="displayedMap">
    <div class="name">
      <div v-if="stateNameEdition" @dblclick="editionMode">
        {{ nameQuery }}
      </div>
      <div v-else>
        <input type="text" v-model="newName" ref="rename"
          @keypress.enter="submitRename" @keydown.esc="cancelRename"
          @focusout="cancelRename">
      </div>
    </div>
    <div class="buttons">
      <button @click="displayResult">Afficher les résultats</button>
      <button @click="removeQuery">x</button>
    </div>
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
    align-items: center;
}

.name input{
    max-width: 200px;
}

.buttons button{
    margin-left: 5px;
    min-width: 35px;
    min-height: 35px;
    border-radius: 4px;
}
</style>