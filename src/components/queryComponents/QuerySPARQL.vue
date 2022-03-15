<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.9.0/css/all.min.css" />

  <!-- YASGUI stuff -->
  <link href="https://unpkg.com/@triply/yasgui/build/yasgui.min.css" rel="stylesheet" type="text/css" />

  <!-- datepicker -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chenfengyuan/datepicker@1.0.9/dist/datepicker.min.css">

  <link href="../lib/sparnatural/sparnatural.css" rel="stylesheet">




  <div id="ui-search"></div>



  <span style="font-size:90%;"> 
     Les requêtes sont envoyées à <a id="endpoint" href="http://fr.dbpedia.org/sparql">http://fr.dbpedia.org/sparql</a>
  </span>

  <div id="yasqe"></div>
  <div id="yasr"></div>
  
</template>

<script>

export default {
  name: 'QuerySPARQL',
  data () {
    return {
      config: {
        "@context":
        {
          "Ontology" : "http://www.w3.org/2002/07/owl#Ontology",
          "Class" : "http://www.w3.org/2002/07/owl#Class",
          "ObjectProperty" : "http://www.w3.org/2002/07/owl#ObjectProperty",
          "label": "http://www.w3.org/2000/01/rdf-schema#label",
          "domain": {
            "@id": "http://www.w3.org/2000/01/rdf-schema#domain",
            "@type": "@id"
          },
          "range": {
            "@id": "http://www.w3.org/2000/01/rdf-schema#range",
            "@type": "@id"
          },
          "unionOf": {
            "@id": "http://www.w3.org/2002/07/owl#unionOf",
            "@type": "@id"
          },
          "subPropertyOf": {
            "@id": "http://www.w3.org/2000/01/rdf-schema#subPropertyOf",
            "@type": "@id"
          },
          "faIcon": "http://data.sparna.fr/ontologies/sparnatural-config-core#faIcon",
          "sparqlString": "http://data.sparna.fr/ontologies/sparnatural-config-core#equivalentPath",
          "sparnatural": "http://data.sparna.fr/ontologies/sparnatural-config-core#",
          "datasources": "http://data.sparna.fr/ontologies/sparnatural-config-datasources#",
        },
        "@graph": [
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto",
            "@type" : "Ontology"
          },
          {
            "@id" : "http://dbpedia.org/ontology/Museum",
            "@type" : "Class",
            "label": [
              {"@value" : "Museum", "@language" : "en"},
              {"@value" : "Musée","@language" : "fr"}
            ],
            "faIcon":  "fas fa-university"
          },
          {
            "@id" : "http://dbpedia.org/ontology/Country",
            "@type" : "Class",
            "label": [
              {"@value" : "Country","@language" : "en"},
              {"@value" : "Pays","@language" : "fr"}
            ],
            "faIcon":  "fas fa-globe-africa"
          },
          {
            "@id" : "http://dbpedia.org/ontology/Artwork",
            "@type" : "Class",
            "label": [
              {"@value" : "Artwork","@language" : "en"},
              {"@value" : "Oeuvre","@language" : "fr"}
            ],
            "faIcon":  "fas fa-paint-brush"
          },
          {
            "@id" : "http://dbpedia.org/ontology/Person",
            "@type" : "Class",
            "label": [
              {"@value" : "Person","@language" : "en"},
              {"@value" : "Personne","@language" : "fr"}
            ],
            "faIcon":  "fas fa-male"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Search",
            "@type" : "Class",
            "label": [
              {"@value" : "Search","@language" : "en"},
              {"@value" : "Rechercher","@language" : "fr"}
            ],
            "faIcon":  "fas fa-search"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Date",
            "@type" : "Class",
            "label": [
              {"@value" : "Date","@language" : "en"},
              {"@value" : "Date","@language" : "fr"}
            ],
            "faIcon":  "fas fa-calendar-alt"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Movement",
            "@type" : "Class",
            "subClassOf" : "sparnatural:LinkedDataClass",
            "label": [
              {"@value" : "Movement","@language" : "en"},
              {"@value" : "Mouvement","@language" : "fr"}
            ],
            "faIcon":  "fas fa-palette",
            "sparqlString": "<http://www.w3.org/2004/02/skos/core#Concept>"
          },
          {
            "@id" : "http://dbpedia.org/ontology/country",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:ListProperty",
            "label": [
              {"@value" : "country","@language" : "en"},
              {"@value" : "pays","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Museum",
            "range": "http://dbpedia.org/ontology/Country",
            "datasource" : "datasources:list_rdfslabel_count"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#countryOf",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "country of","@language" : "en"},
              {"@value" : "lieu de","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Country",
            "range": "http://dbpedia.org/ontology/Museum",
            "sparqlString": "^<http://dbpedia.org/ontology/country>",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://dbpedia.org/ontology/museum",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "displayed at","@language" : "en"},
              {"@value" : "exposée à","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Artwork",
            "range": "http://dbpedia.org/ontology/Museum",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#displays",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:NonSelectableProperty",
            "label": [
              {"@value" : "displays","@language" : "en"},
              {"@value" : "expose","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Museum",
            "range": "http://dbpedia.org/ontology/Artwork",
            "sparqlString": "^<http://dbpedia.org/ontology/museum>"
          },
          {
            "@id" : "http://dbpedia.org/ontology/author",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "author","@language" : "en"},
              {"@value" : "auteur","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Artwork",
            "range": "http://dbpedia.org/ontology/Person",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#created",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "created","@language" : "en"},
              {"@value" : "a créé","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://dbpedia.org/ontology/Artwork",
            "sparqlString": "^<http://dbpedia.org/ontology/author>",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#bornIn",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:ListProperty",
            "label": [
              {"@value" : "born in","@language" : "en"},
              {"@value" : "né à","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://dbpedia.org/ontology/Country",
            "sparqlString": "<http://dbpedia.org/ontology/birthPlace>/<http://dbpedia.org/ontology/country>",
            "datasource": "datasources:list_rdfslabel_alpha"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#birthPlace",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "birth place","@language" : "en"},
              {"@value" : "lieu de naissance","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Country",
            "range": "http://dbpedia.org/ontology/Person",
            "sparqlString": "^(<http://dbpedia.org/ontology/birthPlace>/<http://dbpedia.org/ontology/country>)",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#diedIn",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:ListProperty",
            "label": [
              {"@value" : "died at","@language" : "en"},
              {"@value" : "mort à","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://dbpedia.org/ontology/Country",
            "sparqlString": "<http://dbpedia.org/ontology/deathPlace>/<http://dbpedia.org/ontology/country>",
            "datasource": "datasources:list_rdfslabel_alpha"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#deathPlace",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "death place","@language" : "en"},
              {"@value" : "lieu de décès","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Country",
            "range": "http://dbpedia.org/ontology/Person",
            "sparqlString": "^(<http://dbpedia.org/ontology/deathPlace>/<http://dbpedia.org/ontology/country>)",
            "datasource" : "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://dbpedia.org/ontology/deathDate",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:TimeProperty-Year",
            "label": [
              {"@value" : "death date","@language" : "en"},
              {"@value" : "date de décès","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Date"
          },
          {
            "@id" : "http://dbpedia.org/ontology/birthDate",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:TimeProperty-Date",
            "label": [
              {"@value" : "birth date","@language" : "en"},
              {"@value" : "date de naissance","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Date"
          },
          {
            "@id" : "http://dbpedia.org/ontology/movement",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:ListProperty",
            "label": [
              {"@value" : "movement","@language" : "en"},
              {"@value" : "mouvement","@language" : "fr"}
            ],
            "domain": "http://dbpedia.org/ontology/Person",
            "range": "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Movement",
            "datasource": "datasources:list_rdfslabel_count"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#movementIncludes",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:AutocompleteProperty",
            "label": [
              {"@value" : "participant","@language" : "en"},
              {"@value" : "participant","@language" : "fr"}
            ],
            "domain": "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Movement",
            "range": "http://dbpedia.org/ontology/Person",
            "sparqlString" : "^<http://dbpedia.org/ontology/movement>",
            "datasource": "datasources:search_rdfslabel_bifcontains"
          },
          {
            "@id" : "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#search",
            "@type" : "ObjectProperty",
            "subPropertyOf" : "sparnatural:SearchProperty",
            "label": [
              {"@value" : "text search","@language" : "en"},
              {"@value" : "recherche plein-texte","@language" : "fr"}
            ],
            "domain": {
              "@type" : "Class",
              "unionOf" : {
                "@list" : [ 
                  { "@id" : "http://dbpedia.org/ontology/Museum"},
                  { "@id" : "http://dbpedia.org/ontology/Person"},
                  { "@id" : "http://dbpedia.org/ontology/Artwork"}
                ]
              }
            },
            "range": "http://labs.sparna.fr/sparnatural-demo-dbpedia/onto#Search"
          }
        ]
      }
    },
    sparnatural: $('#ui-search').Sparnatural({
      config: config,
      language: lang,
      maxDepth: 4,
      addDistinct: true,
      sendQueryOnFirstClassSelected: true,
      backgroundBaseColor: '2,184,117',
      autocomplete : null,
      list : null,
      defaultEndpoint : $('#endpoint').text(),
      onQueryUpdated: function(queryString, queryJson) {
        queryString = semanticPostProcess(queryString, queryJson);
        queryString = rdfsLabelPostProcess(queryString, queryJson);
        queryString = isPrimaryTopicOfPostProcess(queryString, queryJson);
        queryString = orderByPostProcess(queryString, queryJson);
        yasqe.setValue(queryString);
        yasqe.query();
      }
    });
  },
  yasqe: {
    requestConfig: { endpoint: $('#endpoint').text() },
    copyEndpointOnNewTab: false  
  },
  yasr: {},
  computed: {
    prefixesPostProcess(queryString, queryJson) {
      if(queryString.indexOf("rdf-schema#") == -1) {
        queryString = queryString.replace("SELECT ", "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \nSELECT ");
      }         
      return queryString;
    },
    isPrimaryTopicOfPostProcess(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this <http://xmlns.com/foaf/0.1/isPrimaryTopicOf> ?wikipedia \n}");
      return queryString;
    },
    rdfsLabelPostProcess(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this rdfs:label ?label FILTER(lang(?label) = 'fr') \n}");
      return queryString;
    },
    orderByPostProcess(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "}\nORDER BY ?label LIMIT 5000");
      queryString = queryString.replace("SELECT DISTINCT ?this", "SELECT DISTINCT (STR(?label) AS ?nom) ?wikipedia ?this");
      return queryString;
    },
    semanticPostProcess(queryString, queryJson) {
      queryString = prefixesPostProcess(queryString, queryJson);
      queryString = sparnatural.expandSparql(queryString);
      return queryString;
    },
    link() {
      // link yasqe and yasr
      yasqe.on("queryResponse", function(_yasqe, response, duration) {
      yasr.setResponse(response, duration);
      });
    }
  }
}
</script>


<style scoped>
  .yasqe {
    margin-top: 1em;
  }

  .yasgui .autocompleteWrapper {
    pointer-events: none;
    /* display: disabled !important; */
    /* display: none !important; */
  }
</style>