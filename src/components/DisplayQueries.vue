<template>
  <div>
    <button :class="{displayHistory: true, displayHistoryOpen: moveSidePanel || stateResult}" @click="actionSidePanel">
      <img src="../assets/results.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="historySidepanelOpen">
      <h1>Requêtes</h1>
      <QueriesHistory v-for="(query, i) in queries" 
        :nameQuery="query.name"
        :key="i"
        @renameQuery="remaneAQuery($event, i)"
        @displayQueryResult="refreshDisplayResult(i)"
        ></QueriesHistory>
    </div>
  </div>
</template>

<script>
import QueriesHistory from "./queryComponents/QueriesHistory.vue";

export default {
    name: 'displayQueries',
    emits: ['historyOpenState', 'refreshDisplayResult'],
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
            const query = {
                name: "Requête " + (this.queries.length + 1),
                value: this.queryResult
            }
            this.queries.push(query);
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
        remaneAQuery (name, index) {
            console.log(name, index);
            this.queries[0].name = name;
        },
        refreshDisplayResult(index) {
            this.$emit('refreshDisplayResult', this.queries[index].value);
            this.moveSidePanel = false;
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
</style>