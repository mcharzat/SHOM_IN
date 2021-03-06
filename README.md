# Installation manual

This git aims to install the server part of the Nereus project in order to query the ATLANTIS knowledge base of nautical instructions (IN).

Local installation done under **Linux** 20.0.4 and **Windows** 10/11 using **GraphDB** 9.11.1.

<br>

## What is Nereus ?

Nereus is a web application which aims to query the geo-referenced knowledge base of nautical instructions for users who do not know the SPARQL language. A navigator preparing a sea trip must be able to visualise the results of his queries in the form of synthetic text, cartographic observations and be able to consult the full text of the INs at any time. 

It requires a triplestore, GraphDB in our case, to store this knowledge base. The web interface was built using Vue-cli which uses HTML/CSS and JavaScript with a cartographic interface developed with Leaflet.

<br>

## I. Global arborescence of the project

![Texte alternatif](/public/arborescence.png)

## II. Triplestore for base of knowledge

### GraphDB

Install graphDB and create a repository called atlantis with a OWL2-RL(Optimized) ruleset.

### Configuration 

Retrieve the ATLANTIS ontology on the github: 
```
https://github.com/umrlastig/atlantis-ontology
```

Import the owl ontology file and the ttls knowledge base file into
the repository.

In the graphDB settings (of the software not the web interface) set:<br>
- graphdb.workbench.cors.enable true <br>
- graphdb.workbench.cors.expose-headers *<br>
Set the port to 7200

Reload graphDB

<br>

## III. Sparnatural configuration

The ontology configuration files can be found in the following folder: src/assets/doc/sparnatural_config. 

The files supported by sparnatural are turtle (ttl) or json. For more details, you can refer to the sparnatural github: https://docs.sparnatural.eu/index.html

To change or modify a configuration, after adding the file, go to src/components/queryComponents/QuerySPARQL.vue and modify the lines 54 to 56 to import the file. Also modify the lines 74 and 75 for the name of the buttons and the imported configurations.

<br>

## IV. PDF Files

All pdfs are located in the following folder: public/lib/pdfloader/web/pdfFiles.

This folder also contains a file named 'pdfFilesNames' with all names of pdf located in this folder. Don't forget to update them when you add or update a pdf file.

<br>

## V. Using app

Open a new terminal in the folder project and use the different command lines. 
To launch the  project, run the first two commands.

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

### Developer documentation
```
npm run doc
```

### Compiles and minifies for production
```
npm run build
```

<br>

## VI. Deployment on a Virtual Machine

1.Connect to the VM.

2.Zip the .graphdb folder

3.In another terminal, copy the .graphdb.zip folder in the VM with the following line:

```
scp /folder_way/.graphdb.zip ubuntu@TSI_Vm:~/.graphdb.zip
```

4.In th VM terminal, launch:

```
unzip .graphdb.zip
```

```
rm .graphdb.zip
```