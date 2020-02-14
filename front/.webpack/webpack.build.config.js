const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const prodConfig = merge(baseConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'BASE_URL': JSON.stringify(process.env.BASE_URL)
      }
    })
  ]
});

module.exports = new Promise((resolve, reject) => resolve(prodConfig));
