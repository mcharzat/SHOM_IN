<template>
    <button id="layerManager" class="layerManager" onclick='console.log("layerManager")'></button>
</template>

<script>
export default {
  name: 'LayerManager',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layerManager {
  height: 100px;
  width: 100px;
}

.layerManager {
    position: absolute;
    top: 100px;
    left: 0px;
    z-index: 25;
    
    background: url(../assets/layers.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-color:lightblue;

    border:solid;
    border-color: #076E8C;
    border-width: 2.5px;
}
</style>