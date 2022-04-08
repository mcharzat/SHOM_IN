<template>
    <div class="container-fluid">
      <div class="sparnatBackground">
        <button 
          v-for="(nameConfig,idx) in namesConfigs['buttonName']" 
          :key="(nameConfig,idx)" 
          :class="{buttonConfig:true, buttonClick:getColorButton(idx)}" 
          @click="clickConfig(nameConfig)">
          {{ nameConfig }}
        </button>
      </div>

      <div v-if="isSparnatActive">
        <div id="ui-search">
          <div v-if="!displaySelect" id="displaySelect" class="sparnatBackground">
            <div class="selection">
              <img src="../../assets/valide_selection.png" height ="20" width="20"/>
              Sélection activée
            </div>
          </div>
        </div>
        
        <div id="yasqe" class="yasr_header"></div>
        <div id="yasr" class="yasr_header"></div>
      </div>                             

    </div>  
</template>

<script>
import {Yasr,Yasqe} from '@triply/yasgui'

// ----- Import config sparnatural data ----- //
import Config1 from '../../assets/sparnatural_config/atlantis-config.ttl';
import Config3 from '../../assets/sparnatural_config/test.ttl'


export default {
  name: 'QuerySPARQL',
  emits: ['myQueryResult'],
  props: {
    coordsBboxArea:  {
      type: Array,
      default: () => []
    },
    suppressBbox: {
      type: String,
      default: ""
    },
  },
  data () {
    return {
      namesConfigs: {
        "fileName" : ["atlantis_config.ttl", "atlantis-sparnaconfig.ttl", "test.ttl"],
        "buttonName" : ["Config1", "Config2", "Config3"],
        "config" : [Config1, Config1, Config3]
      },
      sparnatural: {},
      isSparnatActive: false,
      colorButton: [],
      lang: null,
      querySelectBbox: "",
      bboxState: true,
      bboxArea: [],
      tripleStoreLink: "http://172.31.58.17:7200/repositories/test_shom_lambert"
    }
  },
  computed : {
    displaySelect() {
      return this.bboxState;
    }
  },
  watch: {
    coordsBboxArea: function (bbox) {
      this.bboxState = false;
      this.bboxArea = bbox;
    },
    suppressBbox: function () {
      this.bboxState = true;
    }
  },
  mounted() {

    this.colorButton = new Array(this.namesConfigs['config'].length);

    this.clickConfig(this.namesConfigs['buttonName'][0]);
  },
  methods: {
    getColorButton(index) {
      return this.colorButton[index];
    },
    async clickConfig(name) {

      console.log(name);
      this.isSparnatActive = false;
      await this.$forceUpdate();
      this.isSparnatActive = true;
      await this.$forceUpdate();

      for (let i=0; i < this.namesConfigs['buttonName'].length; i++) {

        if (name == this.namesConfigs['buttonName'][i]) {
          this.colorButton[i] = true;
          this.getColorButton(i);
          this.sparnaturalConfiguration(this.namesConfigs['config'][i]); 
        } else {
          this.colorButton[i] = false;
        }
      } 

    },
    sparnaturalConfiguration(configSparnatural) {

      $.urlParam = function(name){
        const results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if(results == null) { return null; }
        return results[1] || 0;
      }

      this.lang = ($.urlParam('lang') != null)?$.urlParam('lang'):'fr';
      const yasqe = this.constructYasqe();

      this.sparnatural = document.getElementById('ui-search').Sparnatural({
        config: configSparnatural,
        maxDepth: 4,
        addDistinct: true,
        language: this.lang,
        sendQueryOnFirstClassSelected: true,
        backgroundBaseColor: '2,184,117',
        autocomplete : null,
        list : null,
        defaultEndpoint: this.tripleStoreLink,
        localCacheDataTtl: 1000 * 60 * 60 * 24, // 24 hours in miiseconds
        filterConfigOnEndpoint : false,
        onQueryUpdated: (queryString) =>  {
          queryString = this.semanticPostProcess(queryString);
          queryString = this.selectorsPostProcess(queryString);
          queryString = this.optionalClassPostProcess(queryString);
          queryString = this.optionalLabelPostProcess(queryString);
          queryString = this.optionalDescriptionPostProcess(queryString);
          queryString = this.getChapterPostProcess(queryString);
          queryString = this.optionalGeomPostProcess(queryString);
          queryString = this.anyEntitiesPostProcess(queryString);
          $('#sparql code').html(queryString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
          yasqe.setValue(queryString);
        },
        tooltipConfig : {
          delay: [800, 100],
          duration: [100, 100],
        },
        // triggered when "play" button is clicked
        onSubmit: (form) => {

          this.filterQueryBySelection(yasqe);

          // enable loader on button
          form.sparnatural.enableLoading() ; 
          // trigger the query from YasQE
          yasqe.query();
        }
      });

          const yasr = this.constructYasr(yasqe);

    // link yasqe and yasr
    yasqe.on("queryResponse", (_yasqe, response, duration) => {
      this.emitResults(response.text);
      yasr.setResponse(response, duration);
      this.sparnatural.disableLoading() ;
    });
    },
    filterQueryBySelection(yasqe) {
      let queryString = yasqe.getValue();

      if (this.bboxArea.length != 0) {
        queryString = this.addSelectAreaBbox(queryString);
      }
      if (this.bboxState) {
        queryString = this.suppressAreaBbox(queryString);
        this.bboxArea = [];
      }
      yasqe.setValue(queryString);
    },
    constructYasqe() {
      return new Yasqe(document.getElementById("yasqe"), {
      requestConfig: { endpoint: this.tripleStoreLink },
      copyEndpointOnNewTab: false});
    },
    constructYasr(yasqe) {
      return new Yasr(document.getElementById("yasr"), {
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes : yasqe.getPrefixesFromQuery,
      "drawOutputSelector": false,
      "drawDownloadIcon": false,
      // avoid persistency side-effects
      "persistency": { "prefix": false, "results": { "key": false }}});
    },
    suppressAreaBbox(queryString) {
      queryString = queryString.replace(this.querySelectBbox, "");
      return queryString;
    },
    addSelectAreaBbox(queryString) {
      this.querySelectBbox = 
      ` ?this geom:hasGeometry ?eGeom .
        ?eGeom gsp:asWKT ?wkt.
        FILTER (geof:sfWithin(?wkt, '''<http://data.ign.fr/id/ignf/crs/RGF93LAMB93> Polygon ((${this.coordsBboxArea[0]} ${this.coordsBboxArea[1]},${this.coordsBboxArea[0]} ${this.coordsBboxArea[3]},${this.coordsBboxArea[2]} ${this.coordsBboxArea[3]},${this.coordsBboxArea[2]} ${this.coordsBboxArea[1]},${this.coordsBboxArea[0]} ${this.coordsBboxArea[1]}))'''^^gsp:wktLiteral))
      }`;
      queryString = queryString.replace(new RegExp('}$'), this.querySelectBbox);
      return queryString;
    },
    prefixesPostProcess(queryString) {
      if(queryString.indexOf("rdf-schema#") == -1) {
          queryString = queryString.replace("SELECT ", 
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n"+
                "PREFIX nav: <http://data.shom.fr/def/navigation_cotiere#>\n"+
                "PREFIX geom: <http://data.ign.fr/def/geometrie#>\n"+
                "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n"+
                "PREFIX geof: <http://www.opengis.net/def/function/geosparql/>\n"+
                "PREFIX gsp: <http://www.opengis.net/ont/geosparql#>\n SELECT ");
      }       
      return queryString;
    },
    selectorsPostProcess(queryString) {
        queryString = queryString.replace(
          "SELECT DISTINCT ?this",
          "SELECT DISTINCT ?this ?type ?category ?label ?description ?information ?wkt ?lat ?lng ?lumineux ?ouvrage ?page ?amer");
        return queryString;
    },
    optionalLabelPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this rdfs:label ?label}.\n"+
                "OPTIONAL{?this skos:prefLabel ?label}.\n}");
        return queryString;
    },
    optionalDescriptionPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this nav:aPourTexteAssocie ?description}.\n"+
                "OPTIONAL{?this nav:aPourInfo ?information}.\n}");
      return queryString;
    },
    optionalGeomPostProcess(queryString) {
        queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this nav:aPourLat ?lat}.\n"+
                "OPTIONAL{?this nav:aPourLng ?lng}.\n"+
                "OPTIONAL{?this nav:estUnRepereLumineux ?lumineux}.\n"+
                "OPTIONAL{?this geom:hasGeometry ?geom.\n ?geom gsp:asWKT ?wkt\n}\n}");
        return queryString;
    },
    optionalClassPostProcess(queryString) {
      const entity = [...queryString.matchAll(new RegExp("this rdf:type ([<].*[>])", "gm"))];
      let qs = "OPTIONAL{" + entity[0][1] + " rdfs:label ?type}.\n"+
              "OPTIONAL{" + entity[0][1] + " skos:prefLabel ?type}.\n"
      const categories = [
        "AideALaNavigation",
        "ZoneDuDomaineMaritime",
        "PhenomeneMeteorologiqueOuOceanographique"
      ];
      categories.forEach(category => {
        qs += "OPTIONAL{" + entity[0][1] + " rdfs:subClassOf nav:" + category + ".\n"+
              "BIND(<http://data.shom.fr/def/navigation_cotiere#" + category + "> AS ?category)}.\n"
      })
      qs += "OPTIONAL{BIND(" + entity[0][1] + " AS ?category)}.\n}"
      queryString = queryString.replace(new RegExp('}$'), qs);
      return queryString;
    },
    anyEntitiesPostProcess(queryString) {
      const entity = [...queryString.matchAll(new RegExp("([a-zA-Z]*_[0-9]).* WHERE", "gm"))];
      if(entity.length > 0) {
        const exp = "this [<].*#([a-zA-Z]+)[>] ." + entity[0][1];
        const property = [...queryString.matchAll(new RegExp(exp, "gm"))];
        queryString = queryString.replace(entity[0][1], property[0][1]);

        queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?" + entity[0][1] + " rdfs:label ?" + property[0][1] + "}.\n"+
                "OPTIONAL{?" + entity[0][1] + " skos:prefLabel ?" + property[0][1] + "}\n}");
      }
      return queryString;
    },
    getChapterPostProcess(queryString){
      queryString = queryString.replace(new RegExp('}$'),
                "<<?this nav:aPourProvenance ?provenance>> nav:aPourNumeroDePage ?page.\n"+
                "?provenance rdf:type ?ouvrage FILTER(?ouvrage != nav:OuvrageIN) }");
      return queryString;
    },
    semanticPostProcess(queryString) {
      queryString = this.prefixesPostProcess(queryString);
      queryString = this.sparnatural.expandSparql(queryString);
      return queryString;
    },
    emitResults (response) {
      let results = JSON.parse(response).results.bindings;
      
      results = this.concatOuvragePage(results);
      const state = this.getStateOfResults(results);
      results = this.synthesizeResults(state, results);

      this.$emit("myQueryResult", results);
    },
    concatOuvragePage(results){
      results.forEach(element => {
        element["reference"] = {
          type: "literal",
          value: element["ouvrage"].value.split('#').slice(-1)[0] + " page " + element["page"].value
        }
        delete element["page"];
        delete element["ouvrage"];
      });
      return results;
    },
    getStateOfResults(results) {
      const state = {};
      results.forEach((result, i) => {
        if (Object.keys(state).includes(result.this.value)) {
          state[result.this.value].push(i);
        } else {
          state[result.this.value] = [i];
        }
      })
      return state;
    },
    synthesizeResults(config, data) {
      const results = [];

      for (const element in config) {
        const result = {};

        config[element].forEach(index => {
          
          Object.keys(data[index]).forEach(field => {
            const datum = data[index][field];
            const lang = Object.keys(datum).includes("xml:lang");
            if (Object.keys(result).includes(field)) {
              if (!result[field].value.includes(datum.value)){
                result[field].value.push(datum.value);
                if (lang) {
                result[field]["xml:lang"].push(datum["xml:lang"]);
                }
              }
            } else {
              result[field] = {type: datum.type, value: [datum.value]};
              if (lang) {
                result[field]["xml:lang"] = [datum["xml:lang"]];
              }
            }
          })
        })
        results.push(result);
      }
      return results;
    }
  }
}
</script>


<style scoped>

  .yasqe .CodeMirror { font-size: 0.8em; height: 380px; }

  .yasr_header {
    display: none;
  }
  .bg-wrapper {
    padding: 0;
  }
  .sparnatBackground {
    display: flex;
    justify-content: stretch;
    width: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(2, 184, 117, 0.1) 0px, rgba(2, 184, 117, 0.1) 96px) repeat scroll 0% 0%;
  }
  .selection {
    margin-left: 42px;
    padding: 2px;
    margin-top: 8px;
    background: #81a9c7;
    width: 20%;
    font-size: 0.8em;
    border-radius: 3px;
    color: white;
    font-weight: bold;
  }
  .buttonConfig {
    flex-grow: 1;
    padding: 5px;
    background: rgba(2,184,117);
    font-size: 0.8em;
    border-radius: 3px 3px 0px 0px;
    border: 0px;
    color: white;
    font-weight: bold;
    box-shadow: 0 0 5px rgba(0,0,0,0.19), 0 0 5px rgba(0,0,0,0.19)
  }
  .buttonConfig:hover {
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(2, 184, 117, 0.1) 0px, rgba(2, 184, 117, 0.1) 96px) repeat scroll 0% 0%;
    color: black;
  }
  .buttonClick {
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(2, 184, 117, 0.1) 0px, rgba(2, 184, 117, 0.1) 96px) repeat scroll 0% 0%;
    color: black;
  }
</style>
