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
              <button class="yasqe_queryButton query_valid " title="Run query" aria-label="Run query"><div class="svgImg queryIcon"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" height="81.9" width="72.9" version="1.1" y="0px" x="0px" viewBox="0 0 72.900002 81.900002" aria-hidden="true"><path id="queryIcon" d="m69.6 35.2-60.3-34.3c-2.2-1.2-4.4-1.2-6.4 0s-2.9 3.4-2.9 5.6v68.8c0 2.2 1.2 4.4 2.9 5.6 1 0.5 2.2 1 3.4 1s2.2-0.5 2.9-1l60.3-34.3c2.2-1.2 3.4-3.4 3.4-5.6s-1.1-4.3-3.3-5.8z"></path><path id="loadingIcon" d="m61.184 36.167-48.73-27.719c-1.7779-0.96976-3.5558-0.96976-5.172 0-1.6163 0.96976-2.3436 2.7476-2.3436 4.5255v55.599c0 1.7779 0.96976 3.5558 2.3436 4.5255 0.80813 0.40407 1.7779 0.80813 2.7476 0.80813 0.96975 0 1.7779-0.40406 2.3436-0.80813l48.73-27.719c1.7779-0.96976 2.7476-2.7476 2.7476-4.5255s-0.88894-3.475-2.6668-4.6872z" fill="none"></path></svg></div></button><div id="yasqe" v-on:on()="onClick" style="display:none"><div class="yasqe"><div class="CodeMirror cm-s-default CodeMirror-wrap" style="height: 300px;"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 5px; left: 49px;"><textarea style="position: absolute; bottom: -1em; padding: 0px; width: 1px; height: 1em; outline: currentcolor none medium;" autocorrect="off" autocapitalize="none" spellcheck="false" tabindex="0" wrap="off"></textarea></div><div class="CodeMirror-vscrollbar" tabindex="-1" cm-not-content="true" style="bottom: 0px; display: block;"><div style="min-width: 1px; height: 365px;"></div></div><div class="CodeMirror-hscrollbar" tabindex="-1" cm-not-content="true"><div style="height: 100%; min-height: 1px; width: 0px;"></div></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div><div class="CodeMirror-gutter-filler" cm-not-content="true"></div><div class="CodeMirror-scroll" tabindex="-1" draggable="true"><div class="CodeMirror-sizer" style="margin-left: 44px; margin-bottom: -12px; border-right-width: 38px; min-height: 365px; padding-right: 12px; padding-bottom: 0px;"><div style="position: relative; top: 0px;"><div class="CodeMirror-lines" role="presentation"><div style="position: relative; outline: currentcolor none medium;" role="presentation"><div class="CodeMirror-measure"><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>10</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>9</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>10</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>6</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>10</div></div><div class="CodeMirror-linenumber CodeMirror-gutter-elt"><div>9</div></div></div><div class="CodeMirror-measure"></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-cursors"><div class="CodeMirror-cursor" style="left: 4px; top: 0px; height: 21px;">&nbsp;</div></div><div class="CodeMirror-code" role="presentation" style=""><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">1</div><div class="CodeMirror-gutter-elt" style="left: 33px; width: 10px;"><div class="CodeMirror-foldgutter-open CodeMirror-guttermarker-subtle"></div></div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-keyword">PREFIX</span><span class="cm-ws"> </span><span class="cm-string-2">rdf:</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">2</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-keyword">PREFIX</span><span class="cm-ws"> </span><span class="cm-string-2">rdfs:</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://www.w3.org/2000/01/rdf-schema#&gt;</span><span class="cm-ws"> </span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">3</div><div class="CodeMirror-gutter-elt" style="left: 33px; width: 10px;"><div class="CodeMirror-foldgutter-open CodeMirror-guttermarker-subtle"></div></div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-keyword">SELECT</span><span class="cm-ws"> </span><span class="cm-keyword">DISTINCT</span><span class="cm-ws"> </span><span class="cm-punc">(</span><span class="cm-keyword">STR</span><span class="cm-punc">(</span><span class="cm-atom">?label</span><span class="cm-punc">)</span><span class="cm-ws"> </span><span class="cm-keyword">AS</span><span class="cm-ws"> </span><span class="cm-atom">?nom</span><span class="cm-punc">)</span><span class="cm-ws"> </span><span class="cm-atom">?wikipedia</span><span class="cm-ws"> </span><span class="cm-atom">?this</span><span class="cm-ws"> </span><span class="cm-keyword">WHERE</span><span class="cm-ws"> </span><span class="cm-punc">{</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">4</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-ws"> &nbsp;</span><span class="cm-atom">?this</span><span class="cm-ws"> </span><span class="cm-string-2">rdf:type</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://dbpedia.org/ontology/Person&gt;</span><span class="cm-punc">;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">5</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-ws"> &nbsp; &nbsp;</span><span class="cm-variable-3">&lt;http://dbpedia.org/ontology/birthPlace&gt;</span><span class="cm-punc">/</span><span class="cm-variable-3">&lt;http://dbpedia.org/ontology/country&gt;</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://fr.dbpedia.org/resource/Inde&gt;</span><span class="cm-punc">.</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">6</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-ws"> &nbsp;</span><span class="cm-atom">?this</span><span class="cm-ws"> </span><span class="cm-string-2">rdfs:label</span><span class="cm-ws"> </span><span class="cm-atom">?label</span><span class="cm-ws"> </span><span class="cm-keyword">FILTER</span><span class="cm-punc">(</span><span class="cm-keyword">lang</span><span class="cm-punc">(</span><span class="cm-atom">?label</span><span class="cm-punc">)</span><span class="cm-ws"> </span><span class="cm-punc">=</span><span class="cm-ws"> </span><span class="cm-string">'fr'</span><span class="cm-punc">)</span><span class="cm-ws"> </span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">7</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-ws"> &nbsp;</span><span class="cm-atom">?this</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://xmlns.com/foaf/0.1/isPrimaryTopicOf&gt;</span><span class="cm-ws"> </span><span class="cm-atom">?wikipedia</span><span class="cm-ws"> </span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">8</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-punc">}</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="left: -44px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 4px; width: 21px;">9</div></div><pre class=" CodeMirror-line " role="presentation"><span role="presentation"><span class="cm-keyword">ORDER</span><span class="cm-ws"> </span><span class="cm-keyword">BY</span><span class="cm-ws"> </span><span class="cm-atom">?label</span><span class="cm-ws"> </span><span class="cm-keyword">LIMIT</span><span class="cm-ws"> </span><span class="cm-number">5000</span></span></pre></div></div></div></div></div></div><div style="position: absolute; height: 38px; width: 1px; border-bottom: 0px solid transparent; top: 365px;"></div><div class="CodeMirror-gutters" style="height: 403px; left: 0px;"><div class="CodeMirror-gutter gutterErrorBar"></div><div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 29px;"></div><div class="CodeMirror-gutter CodeMirror-foldgutter"></div></div></div><div class="yasqe_buttons"><button class="yasqe_share" title="Share query" aria-label="Share query"><div class="svgImg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M36.764 50c0 .308-.07.598-.088.905l32.247 16.12c2.76-2.34 6.293-3.798 10.195-3.798C87.89 63.227 95 70.337 95 79.11 95 87.89 87.89 95 79.118 95c-8.78 0-15.882-7.11-15.882-15.89 0-.317.07-.6.088-.906l-32.247-16.12c-2.77 2.33-6.293 3.79-10.195 3.79C12.11 65.873 5 58.77 5 50c0-8.78 7.11-15.89 15.882-15.89 3.902 0 7.427 1.467 10.195 3.796l32.247-16.12c-.018-.307-.088-.597-.088-.913C63.236 12.11 70.338 5 79.118 5 87.89 5 95 12.11 95 20.873c0 8.78-7.11 15.89-15.882 15.89-3.91 0-7.436-1.467-10.195-3.805L36.676 49.086c.017.308.088.598.088.914z"></path></svg></div></button></div></div><div class="resizeWrapper"><div class="resizeChip"></div></div></div><div class="yasqe"><div class="CodeMirror cm-s-default CodeMirror-wrap" style="height: 300px;"><div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 0px; left: 0px;"><textarea style="position: absolute; bottom: -1em; padding: 0px; width: 1px; height: 1em; outline: currentcolor none medium;" autocorrect="off" autocapitalize="none" spellcheck="false" tabindex="0" wrap="off"></textarea></div><div class="CodeMirror-vscrollbar" tabindex="-1" cm-not-content="true" style="display: block; bottom: 0px;"><div style="min-width: 1px; height: 153px;"></div></div><div class="CodeMirror-hscrollbar" tabindex="-1" cm-not-content="true"><div style="height: 100%; min-height: 1px; width: 0px;"></div></div><div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div><div class="CodeMirror-gutter-filler" cm-not-content="true"></div><div class="CodeMirror-scroll" tabindex="-1" draggable="true"><div class="CodeMirror-sizer" style="margin-left: 0px; padding-right: 0px; padding-bottom: 0px;"><div style="position: relative;"><div class="CodeMirror-lines" role="presentation"><div style="position: relative; outline: currentcolor none medium;" role="presentation"><div class="CodeMirror-measure"></div><div class="CodeMirror-measure"><pre class="CodeMirror-line" role="presentation"><span role="presentation"><span class="cm-keyword">PREFIX</span><span class="cm-ws"> </span><span class="cm-string-2">rdf:</span><span class="cm-ws"> </span><span class="cm-variable-3">&lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;</span></span></pre></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-cursors"></div><div class="CodeMirror-code" role="presentation"></div></div></div></div></div><div style="position: absolute; height: 50px; width: 1px; border-bottom: 0px solid transparent;"></div><div class="CodeMirror-gutters" style="left: 0px;"><div class="CodeMirror-gutter gutterErrorBar"></div><div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 1px;"></div><div class="CodeMirror-gutter CodeMirror-foldgutter"></div></div></div><div class="yasqe_buttons"><button class="yasqe_share" title="Share query" aria-label="Share query"><div class="svgImg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M36.764 50c0 .308-.07.598-.088.905l32.247 16.12c2.76-2.34 6.293-3.798 10.195-3.798C87.89 63.227 95 70.337 95 79.11 95 87.89 87.89 95 79.118 95c-8.78 0-15.882-7.11-15.882-15.89 0-.317.07-.6.088-.906l-32.247-16.12c-2.77 2.33-6.293 3.79-10.195 3.79C12.11 65.873 5 58.77 5 50c0-8.78 7.11-15.89 15.882-15.89 3.902 0 7.427 1.467 10.195 3.796l32.247-16.12c-.018-.307-.088-.597-.088-.913C63.236 12.11 70.338 5 79.118 5 87.89 5 95 12.11 95 20.873c0 8.78-7.11 15.89-15.882 15.89-3.91 0-7.436-1.467-10.195-3.805L36.676 49.086c.017.308.088.598.088.914z"></path></svg></div></button><button class="yasqe_queryButton query_valid " title="Run query" aria-label="Run query"><div class="svgImg queryIcon"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" height="81.9" width="72.9" version="1.1" y="0px" x="0px" viewBox="0 0 72.900002 81.900002" aria-hidden="true"><path id="queryIcon" d="m69.6 35.2-60.3-34.3c-2.2-1.2-4.4-1.2-6.4 0s-2.9 3.4-2.9 5.6v68.8c0 2.2 1.2 4.4 2.9 5.6 1 0.5 2.2 1 3.4 1s2.2-0.5 2.9-1l60.3-34.3c2.2-1.2 3.4-3.4 3.4-5.6s-1.1-4.3-3.3-5.8z"></path><path id="loadingIcon" d="m61.184 36.167-48.73-27.719c-1.7779-0.96976-3.5558-0.96976-5.172 0-1.6163 0.96976-2.3436 2.7476-2.3436 4.5255v55.599c0 1.7779 0.96976 3.5558 2.3436 4.5255 0.80813 0.40407 1.7779 0.80813 2.7476 0.80813 0.96975 0 1.7779-0.40406 2.3436-0.80813l48.73-27.719c1.7779-0.96976 2.7476-2.7476 2.7476-4.5255s-0.88894-3.475-2.6668-4.6872z" fill="none"></path></svg></div><div class="svgImg warningIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.399998 66.399998" aria-hidden="true"><g><path d="M33.2 0C14.9 0 0 14.9 0 33.2c0 18.3 14.9 33.2 33.2 33.2 18.3 0 33.2-14.9 33.2-33.2C66.4 14.9 51.5 0 33.2 0zm0 59.4C18.7 59.4 7 47.6 7 33.2 7 18.7 18.8 7 33.2 7c14.4 0 26.2 11.8 26.2 26.2 0 14.4-11.8 26.2-26.2 26.2z"></path><path d="M33.1 45.6c-1.4 0-2.5.5-3.5 1.5-.9 1-1.4 2.2-1.4 3.6 0 1.6.5 2.8 1.5 3.8 1 .9 2.1 1.3 3.4 1.3 1.3 0 2.4-.5 3.4-1.4 1-.9 1.5-2.2 1.5-3.7 0-1.4-.5-2.6-1.4-3.6-.9-1-2.1-1.5-3.5-1.5zM33.3 12.4c-1.5 0-2.8.5-3.7 1.6-.9 1-1.4 2.4-1.4 4.2 0 1.1.1 2.9.2 5.6l.8 13.1c.2 1.8.4 3.2.9 4.1.5 1.2 1.5 1.8 2.9 1.8 1.3 0 2.3-.7 2.9-1.9.5-1 .7-2.3.9-4l1.1-13.4c.1-1.3.2-2.5.2-3.8 0-2.2-.3-3.9-.8-5.1-.5-1-1.6-2.2-4-2.2z"></path></g></svg></div></button></div></div><div class="resizeWrapper"><div class="resizeChip"></div></div></div></div>
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

export default {
  name: 'QuerySPARQL',
  data () {
    return {
      config: data,
      sparnatural: $('#ui-search').Sparnatural({
          config: this.config,
          maxDepth: 4,
          addDistinct: true,
          sendQueryOnFirstClassSelected: true,
          backgroundBaseColor: '2,184,117',
          autocomplete : null,
          list : null,
          defaultEndpoint : "http://fr.dbpedia.org/sparql",
          onQueryUpdated: function(queryString, queryJson) {
            queryString = this.semanticPostProcess(queryString, queryJson);
            queryString = this.rdfsLabelPostProcess(queryString, queryJson);
            queryString = this.isPrimaryTopicOfPostProcess(queryString, queryJson);
            queryString = this.orderByPostProcess(queryString, queryJson);
            this.yasqe.setValue(queryString);
            this.yasqe.query();
          }
        }),

      yasqe: {
        requestConfig: { endpoint: "http://fr.dbpedia.org/sparql" },
        copyEndpointOnNewTab: false  
      },

      yasr: {}, 
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

    let externalScript4 = document.createElement('script')
    externalScript4.setAttribute('src', 'https://unpkg.com/@triply/yasgui/build/yasgui.min.js')
    document.head.appendChild(externalScript4)

    let externalScript6 = document.createElement('script')
    externalScript6.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js')
    externalScript2.setAttribute('integrity', 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49')
    document.head.appendChild(externalScript6)

    let externalScript5 = document.createElement('script')
    externalScript5.setAttribute('src', '../../../public/lib/sparnatural/sparnatural.js')
    externalScript5.setAttribute("type", "application/js")
    externalScript5.setAttribute("defer", "defer")
    document.head.appendChild(externalScript5)
  },
  methods: {
    prefixesPostProcess: function(queryString, queryJson) {
      if(queryString.indexOf("rdf-schema#") == -1) {
        queryString = queryString.replace("SELECT ", "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \nSELECT ");
      }         
      return queryString;
    },
    isPrimaryTopicOfPostProcess: function(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this <http://xmlns.com/foaf/0.1/isPrimaryTopicOf> ?wikipedia \n}");
      return queryString;
    },
    rdfsLabelPostProcess: function(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "  ?this rdfs:label ?label FILTER(lang(?label) = 'fr') \n}");
      return queryString;
    },
    orderByPostProcess: function(queryString, queryJson) {
      queryString = queryString.replace(new RegExp('}$'), "}\nORDER BY ?label LIMIT 5000");
      queryString = queryString.replace("SELECT DISTINCT ?this", "SELECT DISTINCT (STR(?label) AS ?nom) ?wikipedia ?this");
      return queryString;
    },
    semanticPostProcess: function(queryString, queryJson) {
      queryString = this.prefixesPostProcess(queryString, queryJson);
      queryString = this.sparnatural.expandSparql(queryString);
      return queryString;
    },

    onClick: function (event) {
       // link yasqe and yasr
      this.yasqe.on("queryResponse", function(_yasqe, response, duration) {
        this.yasr.setResponse(response, duration);
      })
      if (event) {
        alert(event.target.tagName)
      }
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