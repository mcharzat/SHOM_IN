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
      title: "Documentation titre",
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
    height: 35px;
    
  }

  .navBarButton {
    width : auto;
    min-width: 40px;
    margin: auto 3px;
    padding : 3px;
    min-height: 100%;
    position: relative;
    color: white;
    background-color: initial;
    border-style: none;
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
    border-radius: 50%;
  }

  .menuButton{
    height: 35px;
    width: auto;
    padding : 3px;
    font-size: 18px;
    border-radius: 50%;
    vertical-align: middle;
  }
  

@media (min-width: 768px) {
  .navBarButton {
    padding: 10px 20px;
  }
}

.navBarButton:before,
.navBarButton:after,
input[type=submit]::before,
input[type=submit]::after {
  border-radius: 80px;
}

.navBarButton:before {
  background-color: white;
  color : #076e8c;
  content: "";
  display: block;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -2;
}

.navBarButton:after {
  background-color: #076e8c;
  bottom: 4px;
  content: "";
  display: block;
  left: 4px;
  overflow: hidden;
  position: absolute;
  right: 4px;
  top: 4px;
  transition: all 100ms ease-out;
  z-index: -1;
}

.navBarButton:hover:not(:disabled):before {
  background-color: white;
  color : #076e8c;
}

.navBarButton:hover:not(:disabled):after {
  color : #076e8c;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition-timing-function: ease-in;
  opacity: 0;
}

.navBarButton:active:not(:disabled) {
  color : #076e8c;
}

.navBarButton:active:not(:disabled):before {
  background-image: linear-gradient(#076e8c 100%), linear-gradient(white);
}

.navBarButton:active:not(:disabled):after {
  background-image: (#076e8c 100%);
  bottom: 4px;
  left: 4px;
  right: 4px;
  top: 4px;
}

.navBarButton:disabled {
  cursor: default;
  opacity: .24;
}
</style>
