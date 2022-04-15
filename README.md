# Installation manual

This git aims to install the server part of the Nereus project in order to query the ATLANTIS knowledge base of nautical instructions (IN).

Installation done under **Linux** and **Windows** 10 using **GraphDB** 9.11.1 and **Visual Studio Code** 1.64.

<br>

## What is Nereus ?

Nereus is a web application which aims to query the geo-referenced knowledge base of nautical instructions for users who do not know the SPARQL language. A navigator preparing a sea trip must be able to visualise the results of his queries in the form of synthetic text, cartographic observations and be able to consult the full text of the INs at any time. 

It requires a triplestore, GraphDB in our case, to store this database. The web interface was built using Vue-cli which uses HTML/CSS and JavaScript with a cartographic interface developed with Leaflet.

<br>

## I. Triplestore for base of knowledge

### GraphDB

Install graphDB and create a repository called test_shom.

### Configuration for development 

Import the owl ontology file and the ttls knowledge base file into
a named graph.

In the graphDB settings (of the software not the web interface) set:<br>
- graphdb.workbench.cors.enable true <br>
- graphdb.workbench.cors.expose-headers *<br>
Set the port to 7200

Reload graphDB

<br>

## II. Sparnatural configuration

The ontology configuration files can be found in the following folder: src/assets/doc/sparnatural_config. 

The files supported by sparnatural are turtle (ttle) or json. For more details, you can refer to the sparnatural github: https://docs.sparnatural.eu/index.html

To change or modify a configuration, after adding the file, go to src/components/queryComponents/QuerySPARQL.vue and modify the lines ... to import the file. Also modify the lines ... for the name of the buttons and the imported configurations.

<br>

## III. PDF Files

All pdfs are located in the following folder: public/lib/pdfloader/web/pdfFiles.

This folder also contains a file named 'pdfFilesNames' with all names of pdf located in this folder. Don't forget to update them when you will add or update a pdf file.

<br>

## IV. Using app

Open the folder project in Visual Studio Code. Then, open a new terminal and use the different command lines. 

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and run the tests
```
npm run tests
```

### Compiles and minifies for production
```
npm run build
```