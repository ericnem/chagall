const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/chagall/'
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/chagall/'
  //   : '/'
})
