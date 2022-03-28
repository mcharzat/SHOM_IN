<template>

    <div class="container-fluid" style="margin-top:1em;">
      <div class="row">
        <div class="col-md-7">
          <div id="ui-search"></div>
        </div>
        <div class="col-md-5">
          <div class="row" style="margin-bottom:0.5em;">
            <div class="col-md-12">
             <span style="font-size:90%;"> 
             Les requêtes sont envoyées à <a id="endpoint" href="http://fr.dbpedia.org/sparql">http://fr.dbpedia.org/sparql</a>
             </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
             <div id="yasqe"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
             <div id="shareQuery">Lien direct vers la requête : <a href="" target="_blank">...</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div id="yasr"></div>
        </div>
      </div>
    </div>
  
</template>

<script>
import data from '../../assets/data/ontology_test.json'
import {Yasr,Yasqe} from '@triply/yasgui'

export default {
  name: 'QuerySPARQL',
  data () {
    return {
      config: data,
      sparnatural:{},
    }
  },
  mounted() {         

    this.sparnatural = document.getElementById('ui-search').Sparnatural({
      config: this.config,
      // config: "sparnatural-config.ttl",
      maxDepth: 4,
      addDistinct: true,
      noTypeCriteriaForObjects: ["http://dbpedia.org/ontology/Artwork"],
      sendQueryOnFirstClassSelected: true,
      backgroundBaseColor: '2,184,117',
      autocomplete : null,
      list : null,
      defaultEndpoint: "http://fr.dbpedia.org/sparql",
      sparqlPrefixes : {
        "dbpedia" : "http://dbpedia.org/ontology/"
      },
      localCacheDataTtl: 1000 * 60 * 60 * 24, // 24 hours in miiseconds
      filterConfigOnEndpoint : false,
      onQueryUpdated: (queryString) => {
        queryString = this.semanticPostProcess(queryString);
        $('#sparql code').html(queryString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        yasqe.setValue(queryString);
        // yasqe.query();
      },
      tooltipConfig : {
        delay: [800, 100],
        duration: [100, 100],
      },
      // triggered when "play" button is clicked
      onSubmit: function(form) {
        // enable loader on button
        form.sparnatural.enableLoading() ; 
        // trigger the query from YasQE
        yasqe.query();
      }
    });

    const yasqe = new Yasqe(document.getElementById("yasqe"), {
      requestConfig: { endpoint: "http://fr.dbpedia.org/sparql" },
      copyEndpointOnNewTab: false  
    });

    const yasr = new Yasr(document.getElementById("yasr"), {
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes : yasqe.getPrefixesFromQuery,
      "drawOutputSelector": false,
      "drawDownloadIcon": false,
      // avoid persistency side-effects
      "persistency": { "prefix": false, "results": { "key": false }}
    });

    // link yasqe and yasr
    yasqe.on("queryResponse", function(_yasqe, response, duration) {
      yasr.setResponse(response, duration);
      this.sparnatural.disableLoading() ;
    });
  },
  methods: {
    prefixesPostProcess(queryString) {
      if(queryString.indexOf("rdf-schema#") == -1) {
          queryString = queryString.replace("SELECT ", "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \nSELECT ");
      }       
      return queryString;
    },
    semanticPostProcess(queryString) {
      queryString = this.prefixesPostProcess(queryString);
        queryString = this.sparnatural.expandSparql(queryString);
        return queryString;
    }
  }
}
</script>


<style scoped>

  .yasqe .CodeMirror { font-size: 0.8em; height: 380px; }

  .yasr_header {
    display: none;
  }
</style>