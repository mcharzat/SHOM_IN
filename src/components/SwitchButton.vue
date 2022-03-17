<template>
    <div id="selectButton" class="selectButton">
      <img src="../assets/select.png" height ="20" width="20"/>
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
    border-radius: 2px;
    right : 10px;
    bottom : 96px;
    z-index: 25;

    background-color:#f4f4f4;

    height: 30px;
    width: 30px;

    cursor:  pointer;
}

.selectButton {
    display:flex;
    align-items: center;
    justify-content: center;
}

</style>