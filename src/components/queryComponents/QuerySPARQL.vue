<template>

      <div class="container-fluid" style="margin-top:1em;">
      <div class="row">
        <div class="col-md-7">
          <div id="ui-search"></div>
        </div>
        <div class="col-md-5">
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
import data from '../../assets/data/ontology_test.json'
import {Yasr,Yasqe} from '@triply/yasgui'

export default {
  name: 'QuerySPARQL',
  emits: ['myQueryResult'],
  data () {
    return {
      config: data,
      sparnatural: {}
    }
  },
  mounted() {

    this.sparnatural = $('#ui-search').Sparnatural({
      config: this.config,
      maxDepth: 4,
      addDistinct: true,
      sendQueryOnFirstClassSelected: true,
      backgroundBaseColor: '2,184,117',
      autocomplete : null,
      list : null,
      defaultEndpoint : "http://fr.dbpedia.org/sparql",
      onQueryUpdated: (queryString) => {
        queryString = this.semanticPostProcess(queryString);
        queryString = this.rdfsLabelPostProcess(queryString);
        queryString = this.isPrimaryTopicOfPostProcess(queryString);
        queryString = this.orderByPostProcess(queryString);
        yasqe.setValue(queryString);
        yasqe.query();
      }
    });

    const yasqe = new Yasqe(document.getElementById("yasqe"), {
      requestConfig: { endpoint: "http://fr.dbpedia.org/sparql" },
      copyEndpointOnNewTab: false  
    });

    const yasr = new Yasr(document.getElementById("yasr"));

    // link yasqe and yasr
    yasqe.on("queryResponse", (_yasqe, response, duration) => {
      this.$emit("myQueryResult", JSON.parse(response.text));
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
  }
</style>