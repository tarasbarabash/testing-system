const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const prodConfig = merge(baseConfig, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()]
});

module.exports = new Promise((resolve, reject) => resolve(prodConfig));
