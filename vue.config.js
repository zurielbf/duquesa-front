const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
});
