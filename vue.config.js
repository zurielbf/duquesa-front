const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: 'https://ym0xe6o2q2.execute-api.us-east-1.amazonaws.com',
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
});
