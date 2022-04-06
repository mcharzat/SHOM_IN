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
    <a href="#part5">
      <button id=button_5>5</button>
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
        <img src="../assets/doc/NavBar_shom.png" style="height: 75px;">
      </p>
      <p>
        En cliquant sur ce bouton, une fenêtre pop-up s'ouvre avec des liens vers les 4 sites du SHOM : <br>
        &emsp;- Site institutionnel <br>
        &emsp;- Portail data.shom.fr <br>
        &emsp;- Espace de diffusion <br>
        &emsp;- Portail horaire des marées <br><br>

        3. Un bouton qui ramène sur la documentation que vous êtes en train de consulter ! 
        <img src="../assets/doc/NavBar_help.png" style="height: 75px;">
      </p>
    </div>

    <div id=part2>
      <h5>2- Gestion des couches <img src="../assets/doc/Couche.png"> </h5>
      <p>
        Le bouton de gestion de couche, lorsqu'il est cliqué, permet de sélectionner les couches à afficher.<br>
        &emsp;- Hydrography : Carte de profondeur des fonds marins.<br>
        &emsp;- Soundings : <br>
        &emsp;- Dangers : Les différents dangers en mer.<br>
        &emsp;- Restrictions : Différentes restrictions représentées sur la carte.<br>
        &emsp;- Topography : <br>
        &emsp;- Aids to navigation : Les bouées et les phares le long de la côte.<br>
        &emsp;- Metadata : Les métadonnées liées aux zones.<br><br>
      </p>
    </div>

    <div id=part3>
      <h5>3- Gestion de la carte</h5>
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

    <div id=part4>
      <h5>4- Requêtes Sparnatural</h5>
      <p>
        Lorem ipsum dolor sit amet. Et assumenda ipsa quo vitae iure et saepe corrupti et voluptatem enim. Et doloribus odio nam illo facilis in galisum natus est magnam ratione vel incidunt perspiciatis et sequi error. Non dolorum pariatur aut blanditiis laudantium non doloremque accusantium aut aperiam placeat hic odit maiores. Ut exercitationem delectus in quia accusamus non ipsa nulla 33 deleniti vero a facilis ratione id voluptatibus dolor. Rem voluptates dolores est dolore omnis sit autem aspernatur qui aliquam illum in voluptatem voluptatum. Qui facilis fuga aut facilis quisquam hic excepturi eius voluptatum reprehenderit est quidem modi eum repellat cumque et dolor rerum. Est fugit explicabo qui dolor optio ut nobis nihil eum quia facere et nihil molestiae ut exercitationem tenetur! Qui quis nobis est maxime suscipit cum rerum quasi ut repellendus consequatur aut officia incidunt est blanditiis voluptatibus non ratione culpa!
      </p>
    </div>

    <div id=part5>
      <h5>5- Affichage des IN en pdf</h5>
      <p>
        Lorem ipsum dolor sit amet. Et assumenda ipsa quo vitae iure et saepe corrupti et voluptatem enim. Et doloribus odio nam illo facilis in galisum natus est magnam ratione vel incidunt perspiciatis et sequi error. Non dolorum pariatur aut blanditiis laudantium non doloremque accusantium aut aperiam placeat hic odit maiores. Ut exercitationem delectus in quia accusamus non ipsa nulla 33 deleniti vero a facilis ratione id voluptatibus dolor. Rem voluptates dolores est dolore omnis sit autem aspernatur qui aliquam illum in voluptatem voluptatum. Qui facilis fuga aut facilis quisquam hic excepturi eius voluptatum reprehenderit est quidem modi eum repellat cumque et dolor rerum. Est fugit explicabo qui dolor optio ut nobis nihil eum quia facere et nihil molestiae ut exercitationem tenetur! Qui quis nobis est maxime suscipit cum rerum quasi ut repellendus consequatur aut officia incidunt est blanditiis voluptatibus non ratione culpa!
      </p>
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
    left: 562px;
    top: 85px;
  }
  #button_2{
    position: absolute;
    left: 100px;
    top: 565px;
  }
  #button_3{
    position: absolute;
    left: 790px;
    top: 540px;
  }
  #button_4{
    position: absolute;
    left: 857px;
    top: 215px;
  }
  #button_5{
    position: absolute;
    left: 1063px;
    top: 150px;
  }
</style>