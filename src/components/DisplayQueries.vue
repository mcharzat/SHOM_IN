<template>
  <div>
    <button :class="{displayHistory: true, displayHistoryOpen: moveSidePanel || stateResult}" @click="actionSidePanel">
      <img src="../assets/results.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="historySidepanelOpen">
      <div>
        <h1 class="title">Requêtes</h1>
        <QueriesHistory v-for="(query, i) in queries" 
          :nameQuery="query.name"
          :key="i"
          @renameQuery="remaneAQuery($event, i)"
          @displayQueryMap="handleStateDisplay"
          @displayQueryResult="refreshDisplayResult(i)"
          @removeQuery="removeAQuery(i)"
          ></QueriesHistory>
      </div>
      <div class="buttonsManage">
        <button class="reset" @click="reset">
          <img src="../assets/x.png" height ="16" width="16"/>
          <div class="resetText">Tout supprimer</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QueriesHistory from "./queryComponents/QueriesHistory.vue";

export default {
    name: 'displayQueries',
    emits: [
        'historyOpenState',
        'nameUpdated',
        'stateDisplayQuery',
        'refreshDisplayResult',
        'removeQuery',
        'resetQueries'
    ],
    components : {
        QueriesHistory
    },
    props: {
        stateResult: {
            type: Boolean,
            default: false
        },
        queryResult:  {
        type: Array,
        default: () => []
        },
    },
    data() {
        return {
            queries: [],
            moveSidePanel: false,
        }
    },
    watch: {
        queryResult: function () {
            let number =  this.queries.length + 1;
            while (!this.checkName("Requête " + number)) {
                number += 1;
            }
            const query = {
                name: "Requête " + number,
                value: this.queryResult
            }
            this.queries.push(query);
            this.conveyUpdatedName("newQuery", query.name);
        },
        moveSidePanel: function () {
            this.$emit('historyOpenState', this.moveSidePanel);
        },
        stateResult : function () {
            this.moveSidePanel = this.stateResult ? false : this.moveSidePanel;
        }
    },
    methods: {
        actionSidePanel() {
            this.moveSidePanel = !this.moveSidePanel;
        },
        checkName(newName) {
            let response = true;
            this.queries.forEach(query => {
                if (query.name == newName) {
                    response = false;
                }
            })
            return response;
        },
        conveyUpdatedName(oldName, newName) {
            const data = {
                time: Date.now(),
                old: oldName,
                new: newName
            }
            this.$emit('nameUpdated', data);
        },
        remaneAQuery (name, index) {
            if (this.checkName(name)) {
                this.conveyUpdatedName(this.queries[index].name, name);
                this.queries[index].name = name;
            }
        },
        handleStateDisplay(stateDisplay) {
            this.$emit("stateDisplayQuery", stateDisplay);
        },
        refreshDisplayResult(index) {
            this.$emit('refreshDisplayResult', this.queries[index].value);
        },
        removeAQuery(index) {
            const data = {
                time: Date.now(),
                name: this.queries[index].name
            }
            this.$emit('removeQuery', data);
            this.queries.splice(index, 1);
        },
        reset() {
            this.$emit('resetQueries');
            this.queries = [];
        },
    },
}
</script>

<style scope>
.displayHistory {
    position: absolute;
    height: 50px;
    width: 50px;
    top: 210px;
    left: 5px;
    z-index: 30;
    
    background-color:white;

    border:solid;
    border-color: white;

    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}

.displayHistoryOpen {
  left: calc(33% + 10px);
}

.historySidepanelOpen {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  background-color: rgba(255, 255, 255, 83%);
  padding-top: 15px;
  left: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 160px);
  top : 100px;
  overflow: scroll;
  z-index: 1000;
}

.title {
    margin-bottom: 10px;
}

.buttonsManage {
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-self: center;

  margin-top: 15px;
  max-width: 200px;

}

.buttonsManage .reset {
  background-color: #f44336;
  color: white;
  font-size: 0.8em;
  padding: 8px 22px 6px 22px;
  border: 0px;
  border-radius: 4px;

  display: flex;
  justify-content: space-between;
}

.resetText {
  padding-left: 5px;
}
</style>