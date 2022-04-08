module.exports = {
    "plugins": [
        "node_modules/jsdoc-vuejs"
    ],
    "source": {
        "include": [
          "src/",
          "src/components/",
          "src/components/layerComponents/",
          "src/components/pdfComponents/",
          "src/components/queryComponents/"
        ],
        "includePattern": ".vue$"
    },
    opts: {
        destination: "docs"
    }
}
