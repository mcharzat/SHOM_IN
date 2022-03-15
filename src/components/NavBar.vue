<template>
  <nav id=navBar>
    <div class=navBarLeft>
      <div id="logo"><img src="../assets/logo.png"></div>
      <div id="name">Nom du site</div>
    </div>
    <div class=navBarMiddle> 
        <label for="login" :hidden="isLog">Login:</label>
        <input type=text name=login v-model="login" :hidden="isLog">
        <label for="pwd" :hidden="isLog">Mdp:</label>
        <input type=password name=pwd v-model="pwd" :hidden="isLog">
        <input id="okButton" type="submit" @click.prevent="getAuth" value="OK" :hidden="isLog">
        <p :hidden="!isLog"> {{ messageLogger }}</p>
        <input id="deconnexion" type="submit" @click.prevent="deconnect" value="Déconnexion" :hidden="!isLog">
    </div>
    <div class=navBarRight>
        <button id="helpButton" title='Aide' @click.prevent="displayHelp">?</button>
    </div>
</nav>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      login: "login",
      pwd: "pwd",
      clientLog: false
    }
  },
  mounted() {
  },
  methods: {
    getAuth: function () {
      this.clientLog = true;
    },
    deconnect: function () {
      this.clientLog = false;
    },
    displayHelp: function () {
      
    }
  },
  computed: {
    messageLogger () {
      return "Connecté en tant que : " + this.login;
    },
    isLog () {
      return this.clientLog;
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
    opacity: 85%;
    padding: 10px;
    display: flex;
    z-index: 10;
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
  #deconnexion{
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
