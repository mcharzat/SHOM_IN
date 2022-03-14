<template>
  <nav id=navBar>
    <div class=navBarLeft>
      <div id="logo"><img src="../assets/logo.png"></div>
      <div id="name">Nom du site</div>
    </div>
    <div class=navBarMiddle> 
        <label id="loginLabel" for="login">Login:</label>
        <input type=text id=login name=login>
        <label id="pwdLabel" for="pwd">Mdp:</label>
        <input type=password id=pwd name=pwd>
        <button id=okButton >OK</button>
        <p id=logged></p>
    </div>
    <div class=navBarRight>
        <button id=helpButton title='Aide'>?</button>
    </div>
</nav>
</template>

<script>
  window.onload=init;
  function init(){
    const login = "login";
    const pwd = "pwd";
    
    const bouton = document.getElementById('okButton');
    bouton.addEventListener('click',getAuth);

    function getAuth(){
      var log = document.getElementById(login).value;
      var pass = document.getElementById(pwd).value;
      if (log==login && pass==pwd){
        const navBar=document.querySelector('.navBarMiddle');
        navBar.removeChild(document.getElementById('loginLabel'));
        navBar.removeChild(document.getElementById('login'));
        navBar.removeChild(document.getElementById('pwdLabel'));
        navBar.removeChild(document.getElementById('pwd'));
        navBar.removeChild(document.getElementById('okButton'));

        document.getElementById('logged').innerHTML="Connecté en tant que : "+log;
      }
      else{
        window.alert("Le login et/ou le mot de passe sont incorrects");
      }
    }
  }
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
    padding: 10px;
    display: flex;
  }



  .navBarLeft{
    height: 50px;
    width: 400px;
    display: flex;
  }
  #logo{
    margin : auto 10px;
  }
  #logo img{
    height: 50px;
    width: auto;
  }
  #name{
    color: white;
    font-size: 40px;
    margin : auto 10px;
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
  .navBarMiddle p{
    margin : auto 10px;
    color: white;
    font-size: 20px;
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
