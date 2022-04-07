<template>
  <div>
    <img src="../assets/doc/Capture_Nereus_global.png" style="width: 1100px; height: auto; padding-bottom: 30px;">


    <a href="#part1">
      <button id=button_1>1</button>
    </a>
    <a href="#part2">
      <button id=button_2>2</button>
    </a>
    <a href="#part3">
      <button id=button_3>3</button>
    </a>
    <a href="#part4">
      <button id=button_4>4</button>
    </a>


    <div id=part1>
      <h5>1- Barre de navigation :</h5>
      <br>
      <img src="../assets/doc/NavBar.png" style="height: 75px;">
      <br><br>
      <p>
        On retrouve 3 éléments sur la barre de navigation : <br><br>
        1. Une option de login :
      
      <img src="../assets/doc/NavBar_login.png" style="height: 75px;">
      </p>
      <p>
        Lorsque vous accédez au site, connectez-vous avec vos identifiants du SHOM. Cela vous permettra d'avoir accès aux requêtes et aux pdf des Instructions Nautiques. <br><br>

        2. Un bouton qui permet d'accéder aux sites du SHOM : 
        <img src="../assets/doc/NavBar_shom.png" style="height: 60px;">
      </p>
      <p>
        En cliquant sur ce bouton, une fenêtre pop-up s'ouvre avec des liens vers les 4 sites du SHOM : <br>
        &emsp;- Site institutionnel <br>
        &emsp;- Portail data.shom.fr <br>
        &emsp;- Espace de diffusion <br>
        &emsp;- Portail horaire des marées <br><br>

        3. Un bouton qui ramène sur la documentation que vous êtes en train de consulter ! 
        <img src="../assets/doc/NavBar_help.png" style="height: 60px;">
      </p>
    </div>

    <div id=part2>
      <h5>2- Gestion de la carte</h5>
      <br>
      <img src="../assets/doc/Gestion_carte.png" style="height: 100px;">
      <br><br>
      <p>
        On retrouve ici divers boutons permettant de gérer et de mieux comprendre la carte : <br>
        1. Les coordonnées de la souris en temps réel (en Lambert93): <img src="../assets/doc/Gestion_carte_coord.png"> <br>
        2. Une échelle : <img src="../assets/doc/Gestion_carte_echelle.png"> <br>
        3. Des boutons pour gérer le niveau de zoom : <img src="../assets/doc/Gestion_carte_zoom.png"> <br>
        &emsp;Le bouton + permet de zoomer (agrandir) et le bouton - permet de dézoomer (réduire).<br>
        4. Un bouton de sélection : <img src="../assets/doc/Gestion_carte_select.png"> <br>
        En cliquant sur ce bouton, votre curseur va changer. Une fois le curseur modifié, 
        vous pourrez sélectionner une zone sur la carte, qui vous sera utile pour lancer une requête par la suite. 
        Une fois que vous avez fini de vous servir de l'outil sélection, vous pouvez recliquer sur le bouton, 
        puis sur le petit "Cancel" qui apparaît pour annuler votre sélection. <br>
        <img src="../assets/doc/Gestion_carte_select_cancel.png">
      </p>
    </div>

    <div id=part3>
      <h5>3- Requêtes et affichage des résultats</h5>
      <br>
      <img src="../assets/doc/Sparnatural.png" style="height: 200px;">
      <br><br>
      <h6>&emsp;• Boutons et fonctionnalités</h6>
      <p>
        Le bouton <img src="../assets/doc/Sparnatural_sparql_btn.png" style="height: 50px;"> permet d'afficher ou de masquer la zone de requête, et ainsi
        avoir une meilleure vue sur la carte.
      </p>
      <p>
        Le bouton <img src="../assets/doc/Sparnatural_result_btn.png" style="height: 50px;"> permet d'afficher le résultat des requêtes
        effectuées au préalable.
      </p>
      <p>
        Le bouton de gestion de couche, <img src="../assets/doc/Sparnatural_layers_btn.png" style="height: 50px;">
        lorsqu'il est cliqué, permet de sélectionner les couches à afficher.<br>
        On retrouve dans un premier temps des couches tirées du SHOM :<br>
        &emsp;- Hydrography : Carte de profondeur des fonds marins.<br>
        &emsp;- Soundings : <br>
        &emsp;- Dangers : Les différents dangers en mer.<br>
        &emsp;- Restrictions : Différentes restrictions représentées sur la carte.<br>
        &emsp;- Topography : <br>
        &emsp;- Aids to navigation : Les bouées et les phares le long de la côte.<br>
        &emsp;- Metadata : Les métadonnées liées aux zones.<br><br>
      </p>
      <h6>&emsp;• Exemple de requêtes</h6>
      <p>
        Explication sur la div Sparnatural et exemples de requêtes.
      </p>
    </div>

    <div id=part4>
      <h5>4- Affichage des IN en pdf</h5>
      <p>
        Enfin, on retrouve à droite de l'écran le bouton <img src="../assets/doc/Pdf.png" style="height: 50px;"> qui permet
        d'accéder aux pdf des Instructions Nautiques du SHOM.<br>
        Vous pouvez soit l'ouvrir pour lire l'intégralité des ouvrages, soit cliquer sur le résultat d'une requête 
        pour accéder directement à la bonne page comme on peut le voir sur l'exemple ci-dessous:
      </p>
      <img src="../assets/doc/Pdf_exemple.png" style="height: 450px;">
    </div>

  </div>


</template>

<script>

</script>

<style scoped>
  h5{
    text-align: left;
    padding: 0px 20px;
  }
  h6{
    text-align: left;
    padding: 0px 10px;
  }
  p{
    text-align: left;
    padding: 0px 20px;
  }
  button{
    height: 40px;
    width: 40px;
    font-size:20px;
    border-radius: 50%;
    background-color: #C1272D;
    color: white;
  }
  #button_1{
    position: absolute;
    left: 480px;
    top: 82px;
  }
  #button_2{
    position: absolute;
    left: 790px;
    top: 540px;
  }
  #button_3{
    position: absolute;
    left: 857px;
    top: 215px;
  }
  #button_4{
    position: absolute;
    left: 1063px;
    top: 150px;
  }
</style>