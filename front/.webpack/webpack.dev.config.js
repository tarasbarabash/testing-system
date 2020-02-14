const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

const devConfig = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: baseConfig.externals.paths.src,
    port: 8090,
    historyApiFallback: true,
    host: "0.0.0.0",
    overlay: true
  },
  plugins: [new webpack.SourceMapDevToolPlugin({})]
});

module.exports = new Promise((resolve, reject) => resolve(devConfig));
