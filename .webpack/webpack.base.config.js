const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackManifestPlugin = require("webpack-pwa-manifest");

const APP_NAME = "TestMaster";
const SHORT_NAME = "TestMaster";
const APP_DESCRITION = "Testing System";

const PATHS = {
  src: path.join(__dirname, "../src"),
  build: path.join(__dirname, "../build")
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `js/[name].[hash].js`,
    path: PATHS.build,
    publicPath: process.env.BASE_URL ? process.env.BASE_URL : "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /node_modules/,
          enforce: true,
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader?sourceMap",
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./.webpack/postcss.config.js"
              },
              sourceMap: true
            }
          },
          "sass-loader?sourceMap"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash].css`
    }),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: "index.html",
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/404.html`,
      filename: "404.html",
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/assets`, to: `${PATHS.build}/assets` }
    ]),
    new WebpackManifestPlugin({
      name: APP_NAME,
      short_name: SHORT_NAME,
      description: APP_DESCRITION,
      background_color: "#fff",
      theme_color: "#fff",
      display: "standalone",
      start_url: "index.html",
      icons: [
        {
          src: path.resolve("./src/assets/icons/icon.png"),
          sizes: [72, 152, 384, 512],
          destination: "assets/icons/"
        }
      ]
    }),
    new InjectManifest({
      swSrc: `${PATHS.src}/sw.js`
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
