<template>
    <div id="selectButton" class="selectButton">
    </div>
</template>

<script>
export default {
  name: 'SwitchButton',
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#selectButton {
    position : absolute;
    border : 2px solid rgba(0,0,0,0.2);
    border-radius: 4px;
    right : 10px;
    bottom : 113.6px;
    z-index: 25;
    vertical-align: middle;

    background: url(../assets/select.png);
    background-size:90%;
    background-repeat: no-repeat;
    background-color:#f4f4f4;
    background-position: center center;


    height: 30px;
    width: 30px;

    cursor:  pointer;
}

</style>