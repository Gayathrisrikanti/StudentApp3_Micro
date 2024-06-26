const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => {
  const isProduction = process.env.NODE_ENV === 'production' || argv.mode === 'production';
  const publicPath = isProduction
    ? 'https://studentapp3-lab4.netlify.app/' 
    : 'http://localhost:3002/';

  return {
    output: {
      publicPath: publicPath,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devServer: {
      port: 3002,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "studentapp3",
        filename: "remoteEntry.js",
        remotes: {
          studentapp1: isProduction
            ? "studentapp1@https://dulcet-longma-e49a65.netlify.app/remoteEntry.js" 
            : "studentapp1@http://localhost:3000/remoteEntry.js",
        },
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv()
    ],
  };
};
