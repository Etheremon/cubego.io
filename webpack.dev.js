const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = (env) => (
  merge(common(env), {
    module: {
      rules: [{
        test: /\.s?[ac]ss$/,
        include: APP_DIR,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
        }],
      }, {
        loader: 'raw-loader',
        test: /\.obj$/,
      }],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
    },

    devtool: 'inline-source-map',

    plugins: [
      new webpack.DefinePlugin({
        DOMAIN_ROOT: JSON.stringify(''),
      }),
    ],

    mode: 'development',
  })
);
