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
//import $ from 'jquery'
import $ from './../../../public/lib/sparnatural/src/sparnatural.js'
import {Yasr,Yasqe} from '@triply/yasgui'
console.log($);

export default {
  name: 'QuerySPARQL',
  data () {
    return {
      config: data,
      sparnatural:{},
    }
  },
  mounted() {
    
    let externalScript2 = document.createElement('script')
    externalScript2.setAttribute('src', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js')
    externalScript2.setAttribute('integrity', 'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy')
    externalScript2.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(externalScript2)
/*
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.4.1.min.js')
    externalScript.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(externalScript)*/

    let externalScript6 = document.createElement('script')
    externalScript6.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js')
    externalScript6.setAttribute('integrity', 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49')
    document.head.appendChild(externalScript6)
/*
    let externalScript3 = document.createElement('script')
    externalScript3.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@chenfengyuan/datepicker@1.0.9/dist/datepicker.min.js')
    document.head.appendChild(externalScript3)

    
    let externalScript5 = document.createElement('script')
    externalScript5.setAttribute('src', '../../../public/lib/sparnatural/src/sparnatural.js')
    externalScript5.setAttribute("type", "application/js")
    document.head.appendChild(externalScript5)*/
      
    $( document ).ready(function($) {          

      this.sparnatural = $('ui-search').Sparnatural({
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
        onQueryUpdated: function(queryString) {
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
    semanticPostProcess(queryString) {
      queryString = this.prefixesPostProcess(queryString);
        queryString = this.sparnatural.expandSparql(queryString);
        return queryString;
    },
  }
}
</script>


<style scoped>

  @import 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.9.0/css/all.min.css';
  @import 'https://unpkg.com/@triply/yasgui/build/yasgui.min.css';
  @import '../../../public/lib/sparnatural2/sparnatural.css';

  .yasqe .CodeMirror { font-size: 0.8em; height: 380px; }

  .yasr_header {
    display: none;
  }
</style>