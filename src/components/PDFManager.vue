<template>
    <button id="pdfManager" class="pdfManager" onclick='console.log("pdfManager")'></button>
</template>

<script>
export default {
  name: 'PDFManager',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#pdfManager {
  height: 100px;
  width: 100px;
}

.pdfManager {
    position: absolute;
    top: 100px;
    right: 0px;
    z-index: 25;
    
    background: url(../assets/texte.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-color:lightblue;

    border:solid;
    border-color: #076E8C;
    border-width: 2.5px;
}
</style>