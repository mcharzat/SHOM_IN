<template>
  <div>
    <button :class="{displayHistory: true, displayHistoryOpen: moveSidePanel || stateResult}" @click="actionSidePanel">
      <img src="../assets/layers.png" height ="35" width="35"/>
    </button>
    <div v-if="moveSidePanel" class="historySidepanelOpen">
      <div class="manager">
        <h2 class="title" @dblclick="displayManager = !displayManager">
          Gestion des couches
        </h2>
        <div v-if="displayManager">
          <LayerControl v-for="type in Object.keys(configDisplayLayer)"
            :key="type" 
            :config="configDisplayLayer[type]"
            :labels="layersLabel"
            @updateDisplay="updateLayerConfig($event, type)"
          ></LayerControl>
        </div>
        <div v-else>...</div>
      </div>
      <div :class="{history: true, resize: displayHistory}">
        <h2 class="title" @dblclick="displayHistory = !displayHistory">
          Requêtes
        </h2>
        <div class="historyContent" v-if="displayHistory">
          <div>
            <QueriesHistory v-for="(query, i) in queries" 
              :nameQuery="query.name"
              :displayed="configDisplayQueries[i].state"
              :key="i"
              @renameQuery="remaneAQuery($event, i)"
              @displayQueryMap="updateQueryConfig(i)"
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
        <div v-else>...</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module displayQueries
 * @vue-event {Boolean} historyOpenState - State of the display of the composent
 * @vue-event {Object} nameUpdated - Name to be updated
 * @vue-event {Object} stateDisplay - Configuration for display
 * @vue-event {Object} refreshDisplayResult - Refresh oh the display of result is demanded
 * @vue-event {Object} removeQuery - Query to be remove
 * @vue-event resetQueries - Clear the queries
 * @vue-prop {Boolean} [stateResult=false] - State of the display of result component
 * @vue-prop {Array} queryResult - New query
 * @vue-prop {Object} layersList - Layers to handle the display on the map
 * @vue-prop {Object} layersLabel - Labels of the layers
 * @vue-data {Array} queries - List of the queries
 * @vue-data {Array} lastExtra - List of the extra layers
 * @vue-data {Object} configDisplayLayer - Configuration of the display property of the layers
 * @vue-data {Array} configDisplayQueries - Configuration of the display property of the queries
 * @vue-data {Boolean} [moveSidePanel=false] - Wether the content of the component is displayed
 * @vue-data {Boolean} [displayManager=true] - Wether the content of the manager is displayed
 * @vue-data {Boolean} [displayHistory=true] - Wether the content of the history is displayed
 */
import QueriesHistory from "./queryComponents/QueriesHistory.vue";
import LayerControl from "./layerComponents/layerControl.vue";

export default {
    name: 'displayQueries',
    emits: [
        'historyOpenState',
        'nameUpdated',
        'stateDisplay',
        'refreshDisplayResult',
        'removeQuery',
        'resetQueries'
    ],
    components : {
    QueriesHistory,
    LayerControl
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
        layersList:  {
            type: Object,
            default: () => {}
        },
        layersLabel:  {
            type: Object,
            default: () => {}
        },
    },
    data() {
        return {
            queries: [],
            lastExtra: [],
            configDisplayLayer: {
                baseLayers: {},
                categoryLayers: {}
            },
            configDisplayQueries: [],
            moveSidePanel: false,
            displayManager: true,
            displayHistory: true,
        }
    },
    watch: {
        queryResult: function () {
            this.createNewQuery();
        },
        moveSidePanel: function () {
            this.$emit('historyOpenState', this.moveSidePanel);
        },
        stateResult: function () {
            this.moveSidePanel = this.stateResult ? false : this.moveSidePanel;
        },
        layersList: {
            handler (data) {
                if (data.content == "base") {
                    this.setupBaseLayers()
                } else if (data.content == "categories") {
                    this.setupCategoriesLayers();
                    this.setupExtraLayers();
                }
            },
            deep: true
        }
    },
    methods: {
        /**
         * Setup the configuration for the base layers
         */
        setupBaseLayers() {
            this.layersList.data.forEach(layer => {
                if (layer != "selection") {
                    this.configDisplayLayer.baseLayers[layer] = false;
                }
            })
        },
        /**
         * Setup the configuration for the categoreis layers
         */
        setupCategoriesLayers() {
            const configCategoriesLayers = Object.keys(this.configDisplayLayer.categoryLayers);
            if (this.layersList.data.length > configCategoriesLayers.length) {
                this.layersList.data.forEach(layer => {
                    if (!Object.hasOwn(this.configDisplayLayer.categoryLayers), layer) {
                        this.configDisplayLayer.categoryLayers[layer] = true;
                    }
                });
            } else {
                configCategoriesLayers.forEach(layer => {
                    if (!this.layersList.data.includes(layer)) {
                        delete this.configDisplayLayer.categoryLayers[layer];
                    }
                });
            }
        },
        /**
         * Setup the configuration for the extra layers
         */
        setupExtraLayers() {
            if (this.layersList.extra.length > this.lastExtra.length) {
                this.layersList.extra.forEach(layer => {
                    if (!this.lastExtra.includes(layer)) {
                        this.configDisplayLayer.baseLayers[layer] = true;
                        this.lastExtra.push(layer);
                    }
                });
            } else {
                this.lastExtra.forEach(layer => {
                    if (!this.layersList.extra.includes(layer)) {
                        delete this.configDisplayLayer.baseLayers[layer];
                        const index = this.lastExtra.indexOf(layer);
                        this.lastExtra.splice(index, 1);
                    }
                });
            }
        },
        /**
         * instantiate the new query
         */
        createNewQuery() {
            let number =  this.queries.length + 1;
            while (!this.checkName("Requête " + number)) {
                number += 1;
            }
            const query = {
                name: "Requête " + number,
                value: this.queryResult
            }
            this.queries.push(query);
            this.configDisplayQueries.push({
                name: query.name,
                state: true
            });
            this.conveyUpdatedName("newQuery", query.name);
        },
        /**
         * Update moveSidePanel
         */
        actionSidePanel() {
            this.moveSidePanel = !this.moveSidePanel;
        },
        /**
         * Check the unicity of the name
         * @param {String} newName - Name to be tested
         * @return {Boolean} Wether the name is available
         */
        checkName(newName) {
            let response = true;
            this.queries.forEach(query => {
                if (query.name == newName) {
                    response = false;
                }
            })
            return response;
        },
        /**
         * @param {String} oldName - Name to be change
         * @param {String} newName - Name to be use
         * @emits nameUpdated
         */
        conveyUpdatedName(oldName, newName) {
            const data = {
                time: Date.now(),
                old: oldName,
                new: newName
            }
            this.$emit('nameUpdated', data);
        },
        /**
         * Handle the rename request
         * @param {String} name - New name
         * @param {Number} index - Index of the query to update
         */
        remaneAQuery (name, index) {
            if (this.checkName(name)) {
                this.conveyUpdatedName(this.queries[index].name, name);
                this.queries[index].name = name;
                this.configDisplayQueries[index].name = name;
            }
        },
        /**
         * Update the display property of the layer
         * @param {String} layer - Layer to update
         * @param {String} type - Type of the layer
         */
        updateLayerConfig(layer, type) {
            this.configDisplayLayer[type][layer] = !this.configDisplayLayer[type][layer];
            this.conveyDisplayConfig();
        },
        /**
         * Update the display property of the query
         * @param {Number} index - Index of the query to update
         */
        updateQueryConfig(index) {
            this.configDisplayQueries[index].state = !this.configDisplayQueries[index].state;
            this.conveyDisplayConfig();
        },
        /**
         * @emits stateDisplay
         */
        conveyDisplayConfig() {
            this.$emit("stateDisplay", {
                layers: this.configDisplayLayer,
                queries: this.configDisplayQueries
            })
        },
        /**
         * @param {Number} index - Index of the query to refresh
         * @emits refreshDisplayResult
         */
        refreshDisplayResult(index) {
            this.$emit('refreshDisplayResult', this.queries[index].value);
        },
        /**
         * Remove a query
         * @param {Number} index - Index of the query to remove
         * @emits removeQuery
         */
        removeAQuery(index) {
            const data = {
                time: Date.now(),
                name: this.queries[index].name
            }
            this.$emit('removeQuery', data);
            this.queries.splice(index, 1);
            this.configDisplayQueries.splice(index, 1);
        },
        /**
         * Delete all queries
         * @emits resetQueries
         */
        reset() {
            this.$emit('resetQueries');
            this.queries = [];
            this.querconfigDisplayQueriesies = [];
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
  align-content: center;
  user-select: none;

  background-color: rgba(255, 255, 255, 83%);
  padding-top: 15px;
  left: 5px;
  width: 33%;
  height: 100%;
  max-height: calc(100% - 125px);
  top : 100px;
  overflow: scroll;
  z-index: 1000;
}

.history, .historyContent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  margin-top: 7px;
}

.resize {
  height: 100%;
}

.title {
  margin-bottom: 10px;
}

.history .title {
  margin-top: 15px;
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