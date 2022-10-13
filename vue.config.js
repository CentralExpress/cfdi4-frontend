const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  //...
  devServer: {
    server: {
      type: 'https',
      options: {
        key: './src/certs/example.com+5-key.pem',
        cert: './src/certs/example.com+5.pem',
      },
    },
  },
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/actualizacionsatfe/'
    : '/'
}