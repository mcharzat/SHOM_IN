<template>
  <nav id=navBar>
    <div class=navBarLeft>
      <div id="logo"><img src="../assets/logo.png"></div>
      <div id="name">Nom du site</div>
    </div>
    <div class=navBarMiddle> 
        <label for="login">Login:</label>
        <input type=text id=login name=login>
        <label for="pwd">Mdp:</label>
        <input type=password id=pwd name=pwd>
        <button id=okButton>OK</button>
    </div>
    <div class=navBarRight>
        <button id=helpButton title='Aide'>?</button>
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


  .navBarMiddle{
    position: fixed;
    right: 150px;
    height: 50px;
    display: flex;
  }
  .navBarMiddle label{
    margin : auto 0;
    color: white;
    font-size: 20px;
  }
  .navBarMiddle input{
    margin : auto 10px;
    height: 30px;
  }
  #okButton{
    margin : auto 10px;
    height: 30px;
    background: white;
    text-color: #076E8C;
  }



  .navBarRight{
    position: fixed;
    right: 0px;
    height: 50px;
    display: flex;
  }
  #helpButton{
    margin : auto 10px;
    height: 40px;
    width: 40px;
    font-size:30px;
    background: white;
    text-color: #076E8C;
    border-radius: 50%;
  }

</style>
