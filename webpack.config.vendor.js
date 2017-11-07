var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCss = new ExtractTextPlugin('vendor.css');

module.exports = ({ prod } = {}) => {
  const isDevBuild = !prod;

  return [{
    stats: { modules: false },
    module: {
      loaders: [
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' },
        { test: /\.css(\?|$)/, loader: extractCss.extract([isDevBuild ? 'css-loader' : 'css-loader?minimize']) }
      ]
    },
    entry: {
      vendor: [
        'bootstrap/dist/css/bootstrap.css'
      ],
    },
    output: {
      path: path.join(__dirname, 'wwwroot', 'dist'),
      publicPath: 'dist/',
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      extractCss,
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ].concat(isDevBuild ? [] : [new webpack.optimize.UglifyJsPlugin(
        {
          compress: { warnings: false },
          output: { comments: false, beautify: false },
          ecma: 8
        })
    ])
  }]
};
