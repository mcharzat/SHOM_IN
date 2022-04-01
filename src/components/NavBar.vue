<template>
  <nav class=navBar>
    <div class=navBarLeft>
      <div class="logo"><img src="../assets/logo_shom_white.png"></div>
      <div class="name">Nérée</div>
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
        <button class="navBarButton menuButton" title='Sites du SHOM' @click.prevent="displayShom">SHOM</button>
        <button class="navBarButton helpButton" title='Aide' @click.prevent="displayHelp">?</button>
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
    right: 175px;
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
    font-size:20px;
    border-radius: 50%;
  }
  .menuButton{
    height: 40px;
    width: 80px;
    font-size:20px;
    border-radius: 10%;
  }
  
</style>
