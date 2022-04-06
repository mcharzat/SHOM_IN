<template>
  <div class="myQuery">
    <div :class="{name: true, selected: displayedMap}" @click="displayedMap = !displayedMap">
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
      <button @click="displayResult">
        <img src="../../assets/results.png" height ="25" width="25"/>
      </button>
      <button @click="removeQuery">
        <img src="../../assets/trash.png" height ="25" width="25"/>
      </button>
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
    justify-content: center;

    width: 75%;
    height: 35px;
}

.name:hover{
    border: 2px #076e8c solid;
    border-radius: 4px;
}

.selected {
    border: 2px;
    border-radius: 4px;
    background-color: #076e8c;
    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19);
    color: white;
}

.name input{
    max-width: 200px;
}

.buttons button{
    margin-left: 5px;
    min-width: 35px;
    min-height: 35px;
    border-radius: 4px;

    border: 0px;
    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19);

    background-color: white;
}
</style>