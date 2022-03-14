<template>
  <nav id=navBar>
    <div class=navBarLeft>
      <div id="logo"><img src="../assets/logo.png"></div>
      <div id="name">Nom du site</div>
    </div>
    <div class=navBarRight> 
        <label for="login">Login:</label>
        <input type=text id=login name=login>
        <label for="pwd">Mdp:</label>
        <input type=password id=pwd name=pwd>
        <button>OK</button>
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
    display: flex;
  }



  .navBarLeft{
    height: 50px;
    width: 400px;
    display: flex;
    border: 1px red solid;
  }
  #logo{
    margin : auto 20px;
  }
  #logo img{
    height: 50px;
    width: auto;
  }
  #name{
    color: white;
    font-size: 40px;
    margin : auto 0;
  }


  .navBarRight{
    position: fixed;
    right: 25px;
    height: 50px;
    display: flex;
    border: 1px green solid;
  }
  .navBarRight label{
    margin : auto 0;
    color: white;
    font-size: 20px;
  }
  .navBarRight input{
    margin : auto 10px;
    height: 30px;
  }
    .navBarRight button{
    margin : auto 10px;
    height: 30px;
    background: white;
    text-color: #076E8C;
  }

</style>
