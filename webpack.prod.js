const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = env => {
  return (
    merge(common(env), {
      module: {
        rules: [{
          test: /\.s?[ac]ss$/,
          include : APP_DIR,
          use:[{
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            }
          }, {
            loader: 'sass-loader',
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
        runtimeChunk: true,
        minimizer: [
          new OptimizeCSSAssetsPlugin({}),
          // new UglifyJSPlugin({
          //   sourceMap: true,
          // }),
        ],
      },

      devtool: 'cheap-module-source-map',
      stats: {
        children: false
      },

      plugins: [
        // new CompressionPlugin({
        // }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.css',
          chunkFilename: 'styles.css',
        }),
        // new BundleAnalyzerPlugin(),
      ],

      mode: 'production',
    })
  );
};