<template>
  <nav id=navBar>
    <div class=container>
      <div id="logo">Logo</div>
      <div id="name">Nom du site</div>
    </div>
    <div> 
        
    </div>
</nav>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navBar{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background: #076E8C;
  opacity: 80%;
  padding: 10px;
}
.container{
  height: 50px;
  display: flex;
  border: 1px red solid;
}
#logo{
  margin : auto 10px;
}
#name{
  color: white;
  font-size: 40px;
  margin : auto 0;
}
</style>
