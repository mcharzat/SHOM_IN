const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    entry: './public/lib/sparnatural/src/sparnatural.js'
  }
})
