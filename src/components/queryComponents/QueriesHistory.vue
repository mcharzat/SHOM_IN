<template>
  <div class="myQuery">
    <div :class="{name: true, selected: displayed}" @click="updateDisplay">
      <div v-if="!stateNameEdition" @dblclick="editionMode">
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
/**
 * @module queryHistory
 * @vue-event {String} renameQuery - New name of the query
 * @vue-event displayQueryMap - Updated the state of the display on the map of the query
 * @vue-event displayQueryResult - Refresh the display of entity result of the query
 * @vue-event removeQuery - Remove the query
 * @vue-prop {String} [nameQuery=Requête] - Name of the query
 * @vue-prop {Boolean} [displayed=true] - State of the display on the map of the querey
 * @vue-data {Boolean} [stateNameEdition=true] - Wether the display of the name is in edition mode
 * @vue-data {String} [newName=""] - New name of the query
 */
export default {
    name: "queryHistory",
    emits: ['renameQuery', 'displayQueryMap', 'displayQueryResult', 'removeQuery'],
    props: {
        nameQuery:  {
            type: String,
            default: "Requête"
        },
        displayed:  {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            stateNameEdition: false,
            newName: "",
        }
    },
    methods: {
        /**
         * Set up the edition mode
         */
        async editionMode() {
            this.newName = this.nameQuery;
            this.stateNameEdition = !this.stateNameEdition;

            await this.$forceUpdate();
            this.$refs['rename'].focus();
        },
        /**
         * End the edition mode.
         * @emits renameQuery
         */
        submitRename() {
            this.stateNameEdition = !this.stateNameEdition;
            this.$emit('renameQuery', this.newName);
        },
        /**
         * Reset the edition mode and cancel the rename.
         */
        cancelRename() {
            this.stateNameEdition = false;
        },
        /**
         * @emits displayQueryMap
         */
        updateDisplay() {
            this.$emit("displayQueryMap");
        },
        /**
         * @emits displayQueryResult
         */
        displayResult() {
            this.$emit('displayQueryResult');
        },
        /**
         * @emits removeQuery
         */
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
    user-select: none;

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