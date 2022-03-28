<template>

          <!-- ======= Sparnatural Section ======= -->
    <section id="sparnatural-section">
      <div class="container">

        <!-- This is where Sparnatural is inserted -->
        <div class="row">
          <div id="sparnatural-container"></div>
          <input type="hidden" id="query-json">
        </div>

        <!-- -->
        <div class="row">
          <div style="font-style: italic; font-size:0.9em; padding-top:0.4em;">
            
            <a href="#" id="sparql-toggle"><i id="sparql-toggle-icon" class="fad fa-eye fa-fw"></i>&nbsp; <span data-i18n="actions.toggle"></span></a>
          </div>
        </div>

      </div>
    </section><!-- End Sparnatural Section -->

    <!-- ======= YASQE Section ======= -->
    <section id="yasqe-section">
      <div class="container">

        <div id="yasqe" style="display:none; " />

      </div>
    </section>
    <!-- End YASQE Section -->

    <!-- ======= YASR Section ======= -->
    <section id="yasr-section">
      <div class="container">

        <div id="yasr">
          

        </div>

      </div>
    </section><!-- End YASR Section -->
  
</template>

<script>
import data from '../../assets/data/ontology_test.json'
import {Yasr,Yasqe, SparnaturalYasguiPlugins} from '@triply/yasgui'

export default {
  name: 'QuerySPARQL',
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
      sendQueryOnFirstClassSelected: false,
      backgroundBaseColor: '29,224,153',
      autocomplete : null,
      list : null,
      defaultEndpoint : "http://fr.dbpedia.org/sparql",
      onQueryUpdated: function(queryString, queryJson) {
        queryString = this.semanticPostProcess(queryString, queryJson);
        //queryString = this.limitPostProcess(queryString, queryJson);
        // queryString = displayLabelPostProcess(queryString, queryJson);
        // queryString = orderByPostProcess(queryString, queryJson);
        $('#sparql code').html(queryString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
        yasqe.setValue(queryString);
        // yasqe.query();

        // save query
        document.getElementById('query-json').value = JSON.stringify(queryJson);
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
        requestConfig: { 
          endpoint: "http://fr.dbpedia.org/sparql",
          method: "POST",
          header: {}
        },
        copyEndpointOnNewTab: false  
      });

    Yasr.registerPlugin("LabelledUriTable", SparnaturalYasguiPlugins.TableX);
    // Yasr.registerPlugin("Timeline",Timeline);
    delete Yasr.plugins['table'];
    delete Yasr.plugins['response'];
    const yasr = new Yasr(document.getElementById("yasr"), {
      pluginOrder: ["LabelledUriTable", "Timeline"],
      // disable persistency
      persistencyExpire: 0,
      maxPersistentResponseSize: 0
    });


    // link yasqe and yasr
    yasqe.on("queryResponse", function(_yasqe, response, duration) {
      yasr.setResponse(response, duration);
      this.sparnatural.disableLoading() ;
    });

    document.getElementById('sparql-toggle').onclick = function() {
      if(document.getElementById('yasqe').style.display == 'none') {
        document.getElementById('yasqe').style.display = 'block';
        yasqe.setValue(yasqe.getValue());
        yasqe.refresh();
        document.getElementById('sparql-toggle-icon').className = 'fad fa-eye-slash fa-fw';
      } else {
        document.getElementById('yasqe').style.display = 'none';
        document.getElementById('sparql-toggle-icon').className = 'fad fa-eye fa-fw';
      }
      return false;        
    } ; 
/*
    // load ?query= param if present
    var UrlString = window.location.search;
    var urlParams = new URLSearchParams(UrlString);
    if (urlParams.has("query") === true) {
      var compressedJson = urlParams.get("query") ;
      var compressCodec = JsonUrl('lzma');
      compressCodec.decompress(compressedJson).then(json => {
        this.sparnatural.loadQuery(JSON.parse(json)) ;
      });
    }

    document.getElementById('share').onclick = function() {
        var compressCodec = JsonUrl('lzma');
        compressCodec.compress(document.getElementById('query-json').value).then(result => {
          var url = window.location.pathname;
          url += '?query='+result ;
          $('#share-link').text(url);
          $('#share-link').attr('href', url);
          $('#shareModal').modal('show');
        });
      }*/
        
    document.getElementById('export').onclick = function() {
        var jsonString = JSON.stringify(
            JSON.parse(document.getElementById('query-json').value),
            null,
            2
          );
        $('#export-json').val(jsonString);
        $('#exportModal').modal('show');       
    } 
/*
    document.getElementById('select-examples').onclick = function() {
      var key = $('#select-examples option:selected').val();
      if(sampleQueries.hasOwnProperty(key)) {
          this.sparnatural.loadQuery(sampleQueries[key]) ;
      }
    }*/ 
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

.yasqe .CodeMirror {
  font-size: 0.8em;
}

#sparnatural-section {
  padding-top: 115px;
  height: auto;
  overflow: visible;
}

#yasqe {
  display: none;
}

#contact {
  margin-top:40px;
  padding: 0px;
  padding-top: 20px;
}

</style>