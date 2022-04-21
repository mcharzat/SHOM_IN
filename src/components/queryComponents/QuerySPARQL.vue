<template>
    <div class="container-fluid">

      <div class="sparnatBackground">
        <button 
          v-for="(nameConfig,idx) in namesConfigs['buttonName']" 
          :key="(nameConfig,idx)" 
          :title= nameConfig
          :class="{buttonConfig:true, buttonClick:getColorButton(idx)}" 
          @click="clickConfig(nameConfig)" >
          {{ nameConfig }}
        </button>
      </div>

      <div v-if="isSparnatActive">
        <div id="ui-search">
          <div v-if="!bboxState" id="displaySelect" class="sparnatBackground">
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
/**
 * @module querySPARQL
 * @vue-event {Array} myQueryResult - The result of the research
 * @vue-prop {Array} [coordsBboxArea=[]] - Bbox selected by the user
 * @vue-prop {String} [suppressBbox=""] - Selection is remove
 * @vue-data {Array} [namesConfigs=[]] - File and button names of configuration of sparnatural
 * @vue-data sparnatural - Sparnatural element
 * @vue-data {Boolean} [isSparnatActive=false] - Wether research is used
 * @vue-data {Array} [colorButton=[]] - Change button config color when the config is used
 * @vue-data {String} [lang=""] - Language of the ontology
 * @vue-data {String} [querySelectBbox=""] - Part of the query about the selection
 * @vue-data {Boolean} [bboxState=true] - Wether the selection is used
 * @vue-data {Array} [bboxArea=[]] - Bbox to filter
 * @vue-data {String} [tripleStoreLink=""] - Url of the database
 * @vue-data {Array} [queryResult=[]] - Result of the query
 * @vue-data {Boolean} [secondClass=false] - Wether the result is for a second class
 * @vue-data {Boolean} [isResultReceived=false] - Wether the result has been received
 */
import {Yasr,Yasqe} from '@triply/yasgui'

// ----- Import config sparnatural data ----- //
import Config1 from '../../assets/sparnatural_config/ConfigInformations.ttl'
import Config2 from '../../assets/sparnatural_config/ConfigAmers.ttl'
import Config3 from '../../assets/sparnatural_config/ConfigAdmin.ttl';

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
        "buttonName" : ["Informations diverses", "Amers et autres entités", "Informations administratives"],
        "config" : [Config1, Config2, Config3]
      },
      sparnatural: {},
      isSparnatActive: false,
      colorButton: [],
      lang: null,
      querySelectBbox: "",
      bboxState: true,
      bboxArea: [],
      tripleStoreLink: "http://localhost:7200/repositories/atlantis",
      queryResult: [],
      secondClass: false,
      isResultReceived: false
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

    $.urlParam = function(name){
        const results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if(results == null) { return null; }
        return results[1] || 0;
    }
    this.lang = ($.urlParam('lang') != null)?$.urlParam('lang'):'fr';
    this.colorButton = new Array(this.namesConfigs['config'].length);

    this.clickConfig(this.namesConfigs['buttonName'][0]);
  },
  methods: {
    /**
     * Return permission to color button if selected
     * @param {String} index - The index of the button
     * @return {Boolean} the permission to used the selected color
     */
    getColorButton(index) {
      return this.colorButton[index];
    },
    /**
     * Change color button of sparnatural configuration
     * @param {String} name - The name of the config
     */
    async clickConfig(name) {

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
    /**
     * Create sparnatural div for research
     * @param {Array} configSparnatural - The configuration of the ontology
     */
    sparnaturalConfiguration(configSparnatural) {

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
          queryString = this.optionalContactPostProcess(queryString);
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
        this.emitResults(response.text, _yasqe);
        yasr.setResponse(response, duration);
        this.sparnatural.disableLoading() ;
      });
    },
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
     * Remove the selection part of the query
     * @param {String} queryString - The query
     * @return {String} The query updated
     */
    suppressAreaBbox(queryString) {
      queryString = queryString.replace(this.querySelectBbox, "");
      return queryString;
    },
    /**
     * Add the selection part of the query
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
                "PREFIX teg: <http://data.shom.fr/id/codes/nav/typedentitegeographique/>\n"+
                "PREFIX gsp: <http://www.opengis.net/ont/geosparql#>\n SELECT ");
      }       
      return queryString;
    },
    /**
     * Add the parameters to retrieve to the query
     * @param {String} queryString - the query
     * @return {String} The query updated
     */
    selectorsPostProcess(queryString) {
        queryString = queryString.replace(
          "SELECT DISTINCT ?this",
          "SELECT DISTINCT ?this ?type ?category ?label ?description ?instruction ?instructions ?exception ?reglement ?wkt ?lat ?lng ?lumineux ?ouvrage ?page ?amer ?aide ?a ?contact ?horairesVHF ?mail ?horairestelephone ?telephone ?information ?interdiction ?duree ?cible ?lieu");
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
    optionalContactPostProcess(queryString) {
      queryString = queryString.replace(new RegExp('}$'), 
                "OPTIONAL{?this nav:aPourContact ?contact}.\n"+
                "OPTIONAL{?this nav:aPourHorairesVHF ?horairesVHF}.\n"+
                "OPTIONAL{?this nav:aPourAdresseMail ?mail}.\n"+
                "OPTIONAL{?this nav:aPourHorairesTelephone ?horairestelephone}.\n"+
                "OPTIONAL{?this nav:aPourNumeroDeTelephone ?telephone}.\n}");
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
        const exp = "this (<.*#|nav:)([a-zA-Z]+)>? ." + entity[0][1];
        const property = [...queryString.matchAll(new RegExp(exp, "gm"))];
        if (property.length > 0) {
          queryString = queryString.replace(entity[0][1], property[0][2]);

          queryString = queryString.replace(new RegExp('}$'), 
            "OPTIONAL{?" + entity[0][1] + " rdfs:label ?" + property[0][2] + "}.\n"+
            "OPTIONAL{?" + entity[0][1] + " skos:prefLabel ?" + property[0][2] + "}\n}");
        } else {
          const regEx1 = [...queryString.matchAll(new RegExp(".this .* ." + entity[0][1] +".", "gm"))];
          if (regEx1.length > 1) {
            queryString = queryString.replace(regEx1[1][0], "");
            const regEx2 = new RegExp("." + entity[0][1] + " .* .any.");
            queryString = queryString.replace(regEx2, "");
          }
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
    async emitResults (response, yasqe) {
      let results = JSON.parse(response).results.bindings;
      
      if (!this.secondClass) {
        results = this.concatOuvragePage(results);
        const state = this.getStateOfResults(results);
        this.queryResult = this.synthesizeResults(state, results);

        for (const entity of this.queryResult) {
          await this.retrieveSecondClassEntities(entity, "a", yasqe);
        }

        this.$emit("myQueryResult", this.queryResult);
      } else {
        const result = this.transformProperties(results);
        this.queryResult.push(result[0]);
        this.isResultReceived = true;
      }
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
    },
    /**
     * Retrieve all details from the second classes
     * @param {Object} data - Entity of response
     * @param {String} elements - Name of the attribute of the list of second classes
     * @param {Yasqe} yasqe - API to request
     */
    async retrieveSecondClassEntities(data, elements, yasqe) {
      if (Object.keys(data).includes(elements)) {
        this.secondClass = true;
        for (const element of data[elements].value) {
          this.isResultReceived = false;
          const query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n" +
              "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\n" +
              "PREFIX nav: <http://data.shom.fr/def/navigation_cotiere#>\n" +
              "PREFIX geom: <http://data.ign.fr/def/geometrie#>\n" +
              "PREFIX gsp: <http://www.opengis.net/ont/geosparql#>\n" +
              "SELECT DISTINCT ?p ?o ?label ?wkt WHERE {\n" + 
              "<" + element + "> ?p ?o.\n" +
              "OPTIONAL{?o rdfs:label|skos:prefLabel ?label}\n" +
              "OPTIONAL{<" + element + "> geom:hasGeometry ?geom.\n" +
              "?geom gsp:asWKT ?wkt\n}}";
          yasqe.setValue(query);
          await yasqe.query();
          while (!this.isResultReceived) {this.secondClass = true}
        }
        this.secondClass = false;
      }
    },
    /**
     * Transform results of all properties into a result of meaningfull named properties
     * @param {Array} data - Results of a second class
     * @return {Array} Synthetize result for the second class
     */
    transformProperties(data) {
      const config = {secondClass: [0]};
      const results = [{
        category: {
          type: "uri",
          value: "http://data.shom.fr/def/navigation_cotiere#AideALaNavigation"
        },
        wkt: {
          type: "literal",
          value: data[0].wkt.value
        }
      }];
      data.forEach( element => {
        if (!element.p.value.includes("type")
            && !element.p.value.includes("topObjectProperty")
            && !element.p.value.includes("aUneRelationSpatialeAvec")) {
          const property = [...element.p.value.matchAll(new RegExp(".*#([a-zA-Z]+)", "gm"))];
          const objectProperty = {};
          objectProperty[property[0][1]] = {type: "literal"};
          if (element.o.type == "literal") {
            if (Object.keys(element.o).includes("xml:lang")) {
              objectProperty[property[0][1]]["xml:lang"] = element.o["xml:lang"];
            }
            objectProperty[property[0][1]].value = element.o.value;
          } else if (Object.keys(element).includes("label")) {
            if (Object.keys(element.label).includes("xml:lang")) {
              objectProperty[property[0][1]]["xml:lang"] = element.label["xml:lang"];
            }
            objectProperty[property[0][1]].value = element.label.value;
          } else {
            return;
          }
          results.push(objectProperty);
          config.secondClass.push(config.secondClass.length);
        }
      })
      const result = this.synthesizeResults(config, results);
      return result;
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
  .buttonConfig:hover, .buttonClick {
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(2, 184, 117, 0.1) 0px, rgba(2, 184, 117, 0.1) 96px) repeat scroll 0% 0%;
    color: black;
  }
</style>
