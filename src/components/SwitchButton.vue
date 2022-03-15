<template>
    <div id="switchButton" class="switchButton">
        <div >
            <button id='moveButton' onclick="alert('Hi user!')"> </button>
        </div>
        <div >
            <button id='selectButton'> </button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SwitchButton',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#switchButton {
    position : absolute;
    border : 2px solid rgba(0,0,0,0.2);
    right : 10px;
    bottom : 91.5px;
    z-index: 25;
    vertical-align: middle;
}

.switchButton {
    float: right;
    background-color:beige;
}

#selectButton{
    background: url(../assets/select.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 30px;
    width: 30px;
    cursor:  pointer;
    /*z-index: 1000;*/
}

#moveButton{
    background: url(../assets/move.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 30px;
    width: 30px;
    cursor:  pointer;
    /*z-index: 1000;*/
}

</style>