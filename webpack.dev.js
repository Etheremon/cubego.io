const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = env => {
  return (
    merge(common(env), {
      module: {
        rules: [{
          test: /\.s?[ac]ss$/,
          include : APP_DIR,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            }
          }, {
            loader: "sass-loader"
          }]
        }]
      },

      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'initial',
              name: 'vendor',
              test: 'vendor',
              enforce: true
            },
          }
        },
        runtimeChunk: true
      },

      devtool: 'inline-source-map',

      plugins: [
      ],

      mode: 'development',
    })
  );
};
