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
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-11">
          <div id="yasr"></div>
        </div>
      </div>
    </div>
  
</template>

<script>
import data from '../../../public/data/ontology_test.json'
import $ from 'jquery'
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
    
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.3.1.min.js')
    externalScript.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(externalScript)

    let externalScript2 = document.createElement('script')
    externalScript2.setAttribute('src', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js')
    externalScript2.setAttribute('integrity', 'sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy')
    externalScript2.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(externalScript2)

    let externalScript3 = document.createElement('script')
    externalScript3.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@chenfengyuan/datepicker@1.0.9/dist/datepicker.min.js')
    document.head.appendChild(externalScript3)

    let externalScript6 = document.createElement('script')
    externalScript6.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js')
    externalScript2.setAttribute('integrity', 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49')
    document.head.appendChild(externalScript6)

    /*
    let externalScript5 = document.createElement('script')
    externalScript5.setAttribute('src', '../../../public/lib/sparnatural/sparnatural.js')
    externalScript5.setAttribute("type", "application/js")
    document.head.appendChild(externalScript5)*/
      
    $( document ).ready(function($) {

      this.sparnatural = $('#ui-search').Sparnatural({
        config: this.config,
        maxDepth: 4,
        addDistinct: true,
        sendQueryOnFirstClassSelected: true,
        backgroundBaseColor: '2,184,117',
        autocomplete : null,
        list : null,
        defaultEndpoint : "http://fr.dbpedia.org/sparql",
        onQueryUpdated: function(queryString) {
          queryString = this.semanticPostProcess(queryString);
          queryString = this.rdfsLabelPostProcess(queryString);
          queryString = this.isPrimaryTopicOfPostProcess(queryString);
          queryString = this.orderByPostProcess(queryString);
          yasqe.setValue(queryString);
          yasqe.query();
        }
      })
    });

    const yasqe = new Yasqe(document.getElementById("yasqe"), {
      requestConfig: { endpoint: "http://fr.dbpedia.org/sparql" },
      copyEndpointOnNewTab: false  
    });

    const yasr = new Yasr(document.getElementById("yasr"), {});

    // link yasqe and yasr
    yasqe.on("queryResponse", function(_yasqe, response, duration) {
      yasr.setResponse(response, duration);
    });
  },
  methods: {
    prefixesPostProcess(queryString) {
      if(queryString.indexOf("rdf-schema#") == -1) {
        queryString = queryString.replace("SELECT ", "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \nSELECT ");
      }         
      return queryString;
    },
    isPrimaryTopicOfPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this <http://xmlns.com/foaf/0.1/isPrimaryTopicOf> ?wikipedia \n}");
      return queryString;
    },
    rdfsLabelPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this rdfs:label ?label FILTER(lang(?label) = 'fr') \n}");
      return queryString;
    },
    orderByPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), "}\nORDER BY ?label LIMIT 5000");
      queryString = queryString.replace("SELECT DISTINCT ?this", "SELECT DISTINCT (STR(?label) AS ?nom) ?wikipedia ?this");
      return queryString;
    },
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
  @import '../../../public/lib/sparnatural/sparnatural.css';
  @import 'https://cdn.jsdelivr.net/npm/@chenfengyuan/datepicker@1.0.9/dist/datepicker.min.css';

  .yasqe {
    margin-top: 1em;
  }

  .yasgui .autocompleteWrapper {
    pointer-events: none;
    /* display: disabled !important; */
    /* display: none !important; */
  }
</style>