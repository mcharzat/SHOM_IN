<template>
  <nav class=navBar>
    <div class=navBarLeft>
      <div class="logo"><img src="../assets/logo_shom_white.png"></div>
      <div class="name">Nereus</div>
    </div>
    <div v-if="!isLog" class="navBarMiddle notLogged"> 
        <label for="login">Login:</label>
        <input type=text name=login v-model="login">
        <label for="pwd">Mdp:</label>
        <input type=password name=pwd v-model="pwd">
        <input class="navBarButton menuButton" type="submit" @click.prevent="getAuth" value="Connexion">
      </div>
      <div v-else class="navBarMiddle logged">
        <p> {{ messageLogger }}</p>
        <input class="navBarButton menuButton" type="submit" @click.prevent="deconnect" value="Déconnexion">
    </div>
    <div class=navBarRight>
        <button class="navBarButton menuButton" title='Sites du SHOM' @click.prevent="displayShom">Le SHOM</button>
        <button class="helpButton navBarButton" title='Aide' @click.prevent="displayHelp">?</button>
    </div>
</nav>
</template>

<script>
import { createApp } from 'vue';
import SwalDocumentationVue from './SwalDocumentation.vue';
import OtherShomWebsiteVue from './OtherShomWebsites.vue';

export default {
  name: 'navBar',
  data() {
    return {
      login: "login",
      pwd: "pwd",
      clientLog: false,
      title: "Documentation",
      doc: "Documentation"
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
      const doc = createApp(SwalDocumentationVue);

      this.$swal({
        titleText: this.title,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        width: 800,
        html: '<div id="modal"></div>'
      })
      doc.mount("#modal");
    },
    displayShom: function () {
      const doc = createApp(OtherShomWebsiteVue);

      this.$swal({
        titleText: "Voir les sites du SHOM",
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        width: 400,
        html: '<div id="modal"></div>'
      })
      doc.mount("#modal");
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

<style scoped>

  .navBar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    background: #076e8c;
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
    right: 200px;
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
    height: 35px;
    
  }

  .logged p{
    margin : auto 10px;
    color: white;
    font-size: 20px;
    font-family: inherit;
  }


  .navBarRight{
    position: fixed;
    right: 0px;
    height: 50px;
    display: flex;
  }

  .helpButton{
    font-size:20px;
    
    aspect-ratio: 1 / 1;
    height: 100%;

    border-width: 5px;
    border-radius: 50%;
  }

  .menuButton{
    height: 35px;
    width: auto;
    padding : 5px;

    font-size: 18px;
    
    vertical-align: middle;
    
    border-width: 1px;
    border-radius: 5%;
  }
  
  .navBarButton {
    width : auto;
    min-width: 40px;
    margin: auto 0.5em;
    padding: 0px 7px;
    min-height: 35px;
    position: relative;
    color: white;
    background-color: initial;

    border:solid;
    border-color:white;

    font-size: 1.15em;

    box-shadow: 1px;
  }

  .navBarButton:hover {
    background-color: white;
    color : #076e8c;
    border-color:rgb(11, 73, 94);
  }


</style>
