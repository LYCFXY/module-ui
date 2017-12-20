var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './js/main.js',
  output: {
    path: __dirname,
    filename: '../static/js/app.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
    ],
  },
  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader'),
    },
  },
  plugins: [
    new ExtractTextPlugin('../static/css/style.css', {
      allChunks: true,
    }),
  ],
};