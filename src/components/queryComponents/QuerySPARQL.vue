<template>
    <div class="container-fluid">
      <div id="ui-search">
          <div v-if="!bboxState" id="displaySelect" class="displaySelect">
            <div class="selection">
              <img src="../../assets/valide_selection.png" height ="20" width="20"/>
              Sélection activée
            </div>
          </div>
      </div>
      
      <div id="yasqe" class="yasr_header"></div>
      <div id="yasr" class="yasr_header"></div>
    </div>  
</template>

<script>
/**
 * @module querySPARQL
 * @vue-event {Array} myQueryResult - The result of the research
 * @vue-prop {Array} coordsBboxArea - Bbox selected by the user
 * @vue-prop {String} suppressBbox - Selection is remove
 * @vue-data {String} config - File of configuration of sparnatural
 * @vue-data sparnatural - Sparnatural element
 * @vue-data {String} querySelectBbox - Part of the query about the selection
 * @vue-data {Boolean} [bboxState=true] - Wether the selection is used
 * @vue-data {Array} bboxArea - Bbox to filter
 * @vue-data {String} tripleStoreLink - Url of the database
 */
import data from '../../assets/sparnatural_config/atlantis-config.ttl'
import {Yasr,Yasqe} from '@triply/yasgui'

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
    }
  },
  data () {
    return {
      config: data,
      sparnatural: {},
      querySelectBbox: "",
      bboxState: true,
      bboxArea: [],
      tripleStoreLink: "http://172.31.58.17:7200/repositories/test_shom_lambert"
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
    $.urlParam = function(name){
        const results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if(results == null) { return null; }
        return results[1] || 0;
      }

    const lang = ($.urlParam('lang') != null)?$.urlParam('lang'):'fr';

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
      defaultEndpoint: this.tripleStoreLink,
      sparqlPrefixes : {
        "dbpedia" : "http://dbpedia.org/ontology/"
      },
      localCacheDataTtl: 1000 * 60 * 60 * 24, // 24 hours in miiseconds
      filterConfigOnEndpoint : false,
      onQueryUpdated: (queryString) =>  {
        queryString = this.semanticPostProcess(queryString);
        queryString = this.SelectorsPostProcess(queryString);
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

    const yasqe = this.constructYasqe();
    const yasr = this.constructYasr(yasqe);

    // link yasqe and yasr
    yasqe.on("queryResponse", (_yasqe, response, duration) => {
      this.emitResults(response.text);
      yasr.setResponse(response, duration);
      this.sparnatural.disableLoading() ;
    });
  },
  methods: {
    /**
     * Setup the selection
     * @param {*} yasqe 
     */
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
    /**
     * Setup Yasqe
     */
    constructYasqe() {
      return new Yasqe(document.getElementById("yasqe"), {
      requestConfig: { endpoint: this.tripleStoreLink },
      copyEndpointOnNewTab: false});
    },
    /**
     * Setup Yasr
     * @param {*} yasqe - Yasqe
     */
    constructYasr(yasqe) {
      return new Yasr(document.getElementById("yasr"), {
      //this way, the URLs in the results are prettified using the defined prefixes in the query
      getUsedPrefixes : yasqe.getPrefixesFromQuery,
      "drawOutputSelector": false,
      "drawDownloadIcon": false,
      // avoid persistency side-effects
      "persistency": { "prefix": false, "results": { "key": false }}});
    },
    /**
     * Remove the selection pzrt of the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    suppressAreaBbox(queryString) {
      queryString = queryString.replace(this.querySelectBbox, "");
      return queryString;
    },
    /**
     * Add the selection pzrt of the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    addSelectAreaBbox(queryString) {
      this.querySelectBbox = 
      ` ?this geom:hasGeometry ?eGeom .
        ?eGeom gsp:asWKT ?wkt.
        FILTER (geof:sfWithin(?wkt, '''<http://data.ign.fr/id/ignf/crs/RGF93LAMB93> Polygon ((${this.coordsBboxArea[0]} ${this.coordsBboxArea[1]},${this.coordsBboxArea[0]} ${this.coordsBboxArea[3]},${this.coordsBboxArea[2]} ${this.coordsBboxArea[3]},${this.coordsBboxArea[2]} ${this.coordsBboxArea[1]},${this.coordsBboxArea[0]} ${this.coordsBboxArea[1]}))'''^^gsp:wktLiteral))
      }`;
      queryString = queryString.replace(new RegExp('}$'), this.querySelectBbox);
      return queryString;
    },
    /**
     * Add the prefixes to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
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
    /**
     * Add the parameters to retrieve to the query
     * @param {String} queryString - the query
     * @return {String} The query updated
     */
    SelectorsPostProcess(queryString) {
        queryString = queryString.replace(
          "SELECT DISTINCT ?this",
          "SELECT DISTINCT ?this ?type ?category ?label ?description ?information ?wkt ?lat ?lng ?lumineux ?ouvrage ?page ?amer");
        return queryString;
    },
    /**
     * Add retrieval of the label to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    optionalLabelPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this rdfs:label ?label}.\n"+
                "OPTIONAL{?this skos:prefLabel ?label}.\n}");
        return queryString;
    },
    /**
     * Add retrieval of the description/information to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    optionalDescriptionPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this nav:aPourTexteAssocie ?description}.\n"+
                "OPTIONAL{?this nav:aPourInfo ?information}.\n}");
      return queryString;
    },
    /**
     * Add retrieval of the geometry to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    optionalGeomPostProcess(queryString) {
        queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this nav:aPourLat ?lat}.\n"+
                "OPTIONAL{?this nav:aPourLng ?lng}.\n"+
                "OPTIONAL{?this nav:estUnRepereLumineux ?lumineux}.\n"+
                "OPTIONAL{?this geom:hasGeometry ?geom.\n ?geom gsp:asWKT ?wkt\n}\n}");
        return queryString;
    },
    /**
     * Add retrieval of the category/type to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
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
    /**
     * Handle an any query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    anyEntitiesPostProcess(queryString) {
      const entity = [...queryString.matchAll(new RegExp("([a-zA-Z]*_[0-9]).* WHERE", "gm"))];
      if(entity.length > 0) {
        const exp = "this <?.*#([a-zA-Z]+)>? ." + entity[0][1];
        const property = [...queryString.matchAll(new RegExp(exp, "gm"))];
        if (property.length > 0) {
          queryString = queryString.replace(entity[0][1], property[0][1]);

          queryString = queryString.replace(new RegExp('}$'), 
            "OPTIONAL{?" + entity[0][1] + " rdfs:label ?" + property[0][1] + "}.\n"+
            "OPTIONAL{?" + entity[0][1] + " skos:prefLabel ?" + property[0][1] + "}\n}");
        } else {
          const regEx1 = [...queryString.matchAll(new RegExp(".this .* ." + entity[0][1] +".", "gm"))];
          queryString = queryString.replace(regEx1[1][0], "");
          const regEx2 = new RegExp("." + entity[0][1] + " .* .any.");
          queryString = queryString.replace(regEx2, "");
        }
      }
      return queryString;
    },
    /**
     * Add retrieval of the provenance to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    getChapterPostProcess(queryString){
      queryString = queryString.replace(new RegExp('}$'),
                "<<?this nav:aPourProvenance ?provenance>> nav:aPourNumeroDePage ?page.\n"+
                "?provenance rdf:type ?ouvrage FILTER(?ouvrage != nav:OuvrageIN) }");
      return queryString;
    },
    /**
     * Add semantic to the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    semanticPostProcess(queryString) {
      queryString = this.prefixesPostProcess(queryString);
      queryString = this.sparnatural.expandSparql(queryString);
      return queryString;
    },
    /**
     * Handle the result of the research
     * @param {Object} response - Response from Yasqe
     * @emits myQueryResult
     */
    emitResults (response) {
      let results = JSON.parse(response).results.bindings;
      
      results = this.concatOuvragePage(results);
      const state = this.getStateOfResults(results);
      results = this.synthesizeResults(state, results);

      this.$emit("myQueryResult", results);
    },
    /**
     * Group fields page and ouvrage in one element
     * @param {Array} results - Results of the research
     * @return {Array} results
     */
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
    /**
     * Build a config of expolded entities
     * @param {Array} results - Results of the research
     * @return {Object} config
     */
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
    /**
     * Group exploded entities into one
     * @param {Object} config - Config of exploded entities
     * @param {Array} data - Results of the research
     * @return {Array} results
     */
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
  .displaySelect {
    padding-top: 12px;
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(2, 184, 117, 0.1) 0px, rgba(2, 184, 117, 0.1) 116px)
  }
  .selection {
    margin-left: 42px;
    padding: 2px;
    background: rgba(2,184,117);
    width: 20%;
    font-size: 0.8em;
    border-radius: 3px;
    color: white;
    font-weight: bold;
  }
</style>
