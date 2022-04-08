<template>
  <div class="myManager">
    <div v-for="layer in Object.keys(config)" 
      :key="layer"
      :class="{layer: true, selected: config[layer]}"
      @click="updateDisplay(layer)">
      {{ labels[layer] }}
    </div>
  </div>
</template>

<script>
/**
 * @module layerControl
 * @vue-event {String} updateDisplay - Property display of the layer changed
 * @vue-prop {Object} [config={}] - All layers with their display property
 * @vue-prop {Object} [labels={}] - All layers with their label
 */
export default {
  name: 'layerControl',
  emits: ['updateDisplay'],
  props: {
    config:  {
      type: Object,
      default: () => {}
    },
    labels:  {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    /**
     * @param {String} layer - Name of the layer that have been modified
     * @emits updateDisplay
     */
      updateDisplay(layer) {
          this.$emit("updateDisplay", layer);
      }
  }
}
</script>

<style scope>
.myManager {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    border-radius: 5px;

    margin: 2px 5px 2px 2px;
}

.layer {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 96%;
    height: 35px;
    margin: 2px 5px 2px 15px;
}

.layer:hover{
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
</style>