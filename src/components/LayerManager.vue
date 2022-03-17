<template>
    <button id="layerManager" class="layerManager" onclick='console.log("layerManager")'>
      <img src="../assets/layers.png" height ="30" width="30"/>
    </button>
</template>

<script>
export default {
  name: 'LayerManager',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layerManager {
  height: 50px;
  width: 50px;
}

.layerManager {
    position: absolute;
    top: 100px;
    left: 5px;
    z-index: 25;
    
    background-color:white;

    border:solid;
    border-color: white;

    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
}
</style>