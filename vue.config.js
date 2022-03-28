const { defineConfig } = require('@vue/cli-service')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    
    entry: [ "./public/lib/sparnatural/src/sparnatural.js",
      "./public/lib/sparnatural/src/AutocompleteAndListHandlers.js",
      "./public/lib/sparnatural/src/FilteringSpecificationProvider.js",
      "./public/lib/sparnatural/src/JsonLdSpecificationProvider.js",
      "./public/lib/sparnatural/src/LocalCacheData.js",
      "./public/lib/sparnatural/src/LocalDataStorage.js",
      "./public/lib/sparnatural/src/Query.js",
      "./public/lib/sparnatural/src/QueryGenerators.js",
      "./public/lib/sparnatural/src/RDFSpecificationProvider.js",
      "./public/lib/sparnatural/src/SparnaturalComponents.js",
      "./public/lib/sparnatural/src/SparnaturalConfig.js",
      "./public/lib/sparnatural/src/SparnaturalConfigDatasources.js",
      "./public/lib/sparnatural/src/SpecificationProviderFactory.js",
      "./public/lib/sparnatural/src/StatisticsHandlers.js",
      "./public/lib/sparnatural/src/TreeHandlers.js",
      "./public/lib/sparnatural/src/UiuxConfig.js",
      "./public/lib/sparnatural/src/Widgets.js"
    ],
    output: {
    filename: "[name].js"
    },
    module: {
      rules: [
        {
         test: /\.(js|jsx)$/,
         exclude: /node_modules/,
         use: { loader: "babel-loader" }
        },
        {
        test: /\.(scss)$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"} // translates CSS into CommonJS
        ]
      },
        {
        test: /\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"} // translates CSS into CommonJS
        ]
      },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),    
      ],
  }
})