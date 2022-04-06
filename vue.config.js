const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ttl$/i,
          loader: 'file-loader',
        }
      ]
    }
  }
})
