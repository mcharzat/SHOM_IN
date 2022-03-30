<template>
    <div class="container-fluid">
      <div id="ui-search"></div>
      <div id="yasqe" style="display:none"></div>
      <div id="yasr" style="display:none"></div>
    </div>  
</template>

<script>
import data from '../../assets/sparnatural_config/atlantis-sparnaconfig.ttl'
import {Yasr,Yasqe} from '@triply/yasgui'

export default {
  name: 'QuerySPARQL',
  emits: ['myQueryResult'],
  data () {
    return {
      config: data,
      sparnatural:{},

    }
  },
  mounted() {         
    $.urlParam = function(name){
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if(results == null) { return null; }
        return results[1] || 0;
      }

    var lang = ($.urlParam('lang') != null)?$.urlParam('lang'):'fr';

    this.sparnatural = document.getElementById('ui-search').Sparnatural({
      config: this.config ,
      maxDepth: 4,
      addDistinct: true,
      language: lang,
      noTypeCriteriaForObjects: ["http://dbpedia.org/ontology/Artwork"],
      sendQueryOnFirstClassSelected: true,
      backgroundBaseColor: '2,184,117',
      autocomplete : null,
      list : null,
      defaultEndpoint: "http://172.31.58.17:7200/repositories/test_shom",
      sparqlPrefixes : {
        "dbpedia" : "http://dbpedia.org/ontology/"
      },
      localCacheDataTtl: 1000 * 60 * 60 * 24, // 24 hours in miiseconds
      filterConfigOnEndpoint : false,
      onQueryUpdated: (queryString) =>  {
        queryString = this.semanticPostProcess(queryString);
        queryString = this.labelDescriptionSelectionPostProcess(queryString);
        queryString = this.optionalQueriesPostProcess(queryString);
        $('#sparql code').html(queryString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        yasqe.setValue(queryString);
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
      requestConfig: { endpoint: "http://172.31.58.17:7200/repositories/test_shom" },
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
    yasqe.on("queryResponse", (_yasqe, response, duration) => {
      this.$emit("myQueryResult", JSON.parse(response.text));
      yasr.setResponse(response, duration);
      this.sparnatural.disableLoading() ;
    });
  },
  methods: {
    prefixesPostProcess(queryString) {
      if(queryString.indexOf("rdf-schema#") == -1) {
          queryString = queryString.replace("SELECT ", 
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"+
                "PREFIX nav: <http://data.shom.fr/def/navigation_cotiere#>\n"+
                "PREFIX geom: <http://data.ign.fr/def/geometrie#>\n"+
                "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"+
                "PREFIX gsp: <http://www.opengis.net/ont/geosparql#>\n SELECT ");
      }       
      return queryString;
    },
    labelDescriptionSelectionPostProcess(queryString) {
        queryString = queryString.replace("SELECT DISTINCT ?this", "SELECT DISTINCT ?label ?description ?information ?wkt ?lat ?lng");
        return queryString;
    },
    optionalQueriesPostProcess(queryString) {
        queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this rdfs:label ?label}.\n"+
                "OPTIONAL{?this skos:prefLabel ?label}.\n"+
                "OPTIONAL{?this nav:aPourTexteAssocie ?description}.\n"+
                "OPTIONAL{?this nav:aPourInfo ?information}.\n"+
                "OPTIONAL{?this nav:aPourLat ?lat}.\n"+
                "OPTIONAL{?this nav:aPourLng ?lng}.\n"+
                "OPTIONAL{?this geom:hasGeometry ?geom.\n ?geom gsp:asWKT ?wkt\n}\n}");
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