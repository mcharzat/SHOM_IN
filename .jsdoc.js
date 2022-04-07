module.exports = {
    "plugins": [
        "node_modules/jsdoc-vuejs"
    ],
    "source": {
        "include": [
          "src/",
          "src/components/"
        ],
        "includePattern": ".vue$"
    },
    opts: {
        destination: "docs"
    }
}
