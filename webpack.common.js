const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');
const ASSET_DIR = path.resolve(__dirname, 'assets');

const IMAGE_QUALITY = [90, 95];

module.exports = env => {
  return {
    entry: {
      app: APP_DIR + '/app.jsx',
      vendor: [/*'pixi.js', 'three',*/ 'react', 'redux'],
    },
    output: {
      publicPath: '/',
      path: BUILD_DIR,
      // filename: 'bundle.js',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: [APP_DIR, ASSET_DIR],
          use: 'babel-loader',
        }, {
          test: /\.(gif|png|jpg|jpeg|svg|ico|fnt|mp3)$/,
          include: APP_DIR,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                // Compression quality, in range 0 (worst) to 100 (perfect).
                // false creates baseline JPEG file.
                mozjpeg: {
                  progressive: true,
                  quality: IMAGE_QUALITY[0]
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                // Instructs pngquant to use the least amount of colors required to meet or exceed the max quality. If conversion results in quality below the min quality the image won't be saved.
                // Min and max are numbers in range 0 (worst) to 100 (perfect), similar to JPEG.
                pngquant: {
                  quality: `${IMAGE_QUALITY[0]}-${IMAGE_QUALITY[1]}`,
                  speed: 4
                },
                // Interlace gif for progressive rendering.
                gifsicle: {
                  interlaced: false,
                },
                // // the webp option will enable WEBP
                // webp: {
                //   enabled: false,
                // }
              }
            },
          ],
        }, {
          test: /\.(gltf|tmx|tsx)$/,
          include: APP_DIR,
          use: 'file-loader',
        }, {
          test: /\.csv$/,
          include: APP_DIR,
          loader: 'csv-loader',
          options: {
            header: true,
            skipEmptyLines: true,
          }
        }, {
          test: /\.font.png/,
          include: APP_DIR,
          use: 'url-loader?limit=1&name=[name].[ext]',
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env.ENV)
      }),
      new CopyWebpackPlugin([
        {from: APP_DIR + '/../assets/*'},
      ]),

      new HtmlWebpackPlugin({
        inject: false,
        template: APP_DIR + '/../index.html',
        filename: BUILD_DIR + '/index.html',
        customHash: ((new Date()).getTime()).toString(),
      }),

    ],
    node: {
      fs: 'empty',
      global: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
    devServer: {
      historyApiFallback: true,
    }
  }
};