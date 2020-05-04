const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          /* This configuration aids babel-preset-env to disable transpiling of import or export modules to commonJS */
          options: {
            presets: [["es2015", { modules: false }]],
          },
        },
      },
    ],
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        fileName: "./index.html",
      }),
    ],
    optimization: {
      usedExports: true,
      removeEmptyChunks: true,
      splitChunks: {
        cacheGroups: {
          // Split vendor code to its own chunk(s)
          vendors: {
            test: /[\\/]node_modules[\\/]/i,
            chunks: "all",
          },
        },
      },
      // The runtime should be in its own chunk
      runtimeChunk: {
        name: "runtime",
      },
    },
    // ...
  },
};
