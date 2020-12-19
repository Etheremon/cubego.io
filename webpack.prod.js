const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const common = require('./webpack.common.js');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = (env) => (
  merge(common(env), {
    module: {
      rules: [{
        test: /\.s?[ac]ss$/,
        include: APP_DIR,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
        }],
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
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
      ],
    },

    devtool: 'cheap-module-source-map',
    stats: {
      children: false,
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        DOMAIN_ROOT: JSON.stringify('/cubego.io/public'),
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: 'styles.css',
      }),
    ],

    mode: 'production',
  })
);
