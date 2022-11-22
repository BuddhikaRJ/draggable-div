const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const merge = require("webpack-merge").merge;
const {ProgressPlugin} = require("webpack");

const COMMON_CONFIG = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template:'./src/index.html'
      }
    ),
    new ProgressPlugin(),

  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

const BUILD = {
  mode: "production",
};

const SERVE = {
  mode: "development",

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    liveReload: true,
    hot: false,

    open: true,
  },
};

module.exports = (env) => {
  let config = null;
  switch (env.config) {
    case "_BUILD":
      config = BUILD;
      break;
    case "_SERVE":
      config = SERVE;
      break;
  }
  return merge(config, COMMON_CONFIG);
};
