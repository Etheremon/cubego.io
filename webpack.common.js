const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const BASE_DIR = __dirname;
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');
const ASSET_DIR = path.resolve(__dirname, 'assets');

const IMAGE_QUALITY = [90, 95];

module.exports = (env) => ({
  entry: {
    app: `${APP_DIR}/app.jsx`,
    vendor: ['babylonjs', 'react', 'redux'],
  },
  output: {
    publicPath: '',
    path: BUILD_DIR,
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
              mozjpeg: { progressive: true, quality: IMAGE_QUALITY[0] },
              optipng: { enabled: false },
              pngquant: { quality: `${IMAGE_QUALITY[0]}-${IMAGE_QUALITY[1]}`, speed: 4 },
              gifsicle: { interlaced: false },
            },
          },
        ],
      }, {
        test: /\.(gltf|tmx|tsx|vox|obj|babylon|TTF|ttf)$/,
        include: APP_DIR,
        use: 'file-loader',
      }, {
        test: /\.csv$/,
        include: APP_DIR,
        loader: 'csv-loader',
        options: {
          header: true,
          skipEmptyLines: true,
        },
      }, {
        test: /\.o.png/,
        include: APP_DIR,
        use: 'url-loader?limit=1&name=[name].[ext]',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(env.ENV),
      DOMAIN_ROOT: '',
    }),

    new CopyWebpackPlugin([{
      from: `${ASSET_DIR}/`,
      to: `${BUILD_DIR}/assets`,
    },
    ]),

    new HtmlWebpackPlugin({
      inject: false,
      template: `${BASE_DIR}/index_temp.html`,
      filename: `${BUILD_DIR}/index.html`,
      customHash: ((new Date()).getTime()).toString(),
    }),
  ],
  node: {
    fs: 'empty',
    global: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: BUILD_DIR,
    port: 8080,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
});
