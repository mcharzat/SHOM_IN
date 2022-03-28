<template>
  <nav class=navBar>
    <div class=navBarLeft>
      <div class="logo"><img src="../assets/logo.png"></div>
      <div class="name">Nom du site</div>
    </div>
    <div v-if="!isLog" class="navBarMiddle notLogged"> 
        <label for="login">Login:</label>
        <input type=text name=login v-model="login">
        <label for="pwd">Mdp:</label>
        <input type=password name=pwd v-model="pwd">
        <input class="navBarButton" type="submit" @click.prevent="getAuth" value="OK">
      </div>
      <div v-else class="navBarMiddle logged">
        <p> {{ messageLogger }}</p>
        <input class="navBarButton" type="submit" @click.prevent="deconnect" value="Déconnexion">
    </div>
    <div class=navBarRight>
        <button class="navBarButton helpButton" title='Aide' @click.prevent="displayHelp">?</button>
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
      this.login = "login";
      this.pwd = "pwd";
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

  .navBar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    background: rgba(7, 110, 140,0.8);
    padding: 10px;
    display: flex;
    z-index: 10;
  }



  .navBarLeft{
    height: 50px;
    width: 400px;
    display: flex;
  }
  .logo{
    margin : auto 10px;
  }
  .logo img{
    height: 50px;
    width: auto;
  }
  .name{
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
  .notLogged label{
    margin : auto 0;
    color: white;
    font-size: 20px;
  }
  .notLogged input{
    margin : auto 10px;
    height: 30px;
  }
  .navBarButton{
    margin : auto 10px;
    height: 30px;
    background: white;
    color: #076E8C;
  }
  .logged p{
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
  .helpButton{
    height: 40px;
    width: 40px;
    font-size:30px;
    border-radius: 50%;
  }

</style>
