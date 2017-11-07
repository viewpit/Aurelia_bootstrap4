const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const autoprefixer = require('autoprefixer');

var postcssLoader = {
    loader: 'postcss-loader',
    options: { plugins: [require('precss'), require('autoprefixer')] }
};

const cssRules = [
    { loader: 'css-loader' }
];

module.isDebug = true;

module.exports = (env) => {
    module.isDebug = (env && env.prod) ? false : true;

    return [{
        stats: { modules: false },
        entry: { 'app': 'aurelia-bootstrapper' },
        //resolve: {
        //    extensions: ['.ts', '.js'],
        //    modules: ['ClientApp', 'node_modules'],
        //},
        //output: {
        //    path: path.resolve(bundleOutputDir),
        //    publicPath: 'dist/',
        //    filename: '[name].js'
        //},

        output: {
            path: path.resolve(bundleOutputDir),//path.resolve(__dirname, "dist"),
          publicPath: "/dist/",
          filename: "[name].js",
          chunkFilename: "[name].js"
        },

        resolve: {
          extensions: [".ts", ".js"],
          modules: ["ClientApp", "node_modules"].map(x => path.resolve(x)),
        },

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    issuer: [{ not: [{ test: /\.html$/i }] }],
                    use: /*extractCss ? */ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: cssRules
                    })/* : ['style-loader', ...cssRules]*/,
                },
                {
                    test: /\.css$/i,
                    issuer: [{ test: /\.html$/i }],
                    // CSS required in templates cannot be extracted safely
                    // because Aurelia would try to require it again in runtime
                    use: cssRules
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', postcssLoader, 'sass-loader'],
                    issuer: /\.[tj]s$/i
                },
                {
                    test: /\.scss$/,
                    use: ['css-loader', postcssLoader, 'sass-loader'],
                    issuer: /\.html?$/i
                },
                { test: /\.ts$/i, include: /ClientApp/, use: 'ts-loader?silent=true' },
                { test: /\.html$/i, use: 'html-loader' },
                //{ test: /\.css$/i, use: module.isDebug ? 'css-loader' : 'css-loader?minimize' },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },

                /* Bootstrap 4 loader */
                {
                    test: /bootstrap\/dist\/js\/umd\//,
                    use: 'imports-loader?jQuery=jquery'
                },

                /* Font loaders, required for font-awesome-sass-loader and bootstrap-loader */
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(module.isDebug) }),
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            
          }),
            //new webpack.DllReferencePlugin({
            //    context: __dirname,
            //    manifest: require('./wwwroot/dist/vendor-manifest.json')
            //}),

            //  new webpack.ProvidePlugin({
            //    $: 'jquery',
            //    jQuery: 'jquery',
            //    'window.jQuery': 'jquery',
            //    Popper: ['popper.js', 'default'],
            //  Tether: "tether",
            //  "window.Tether": "tether",
            //  Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            //  Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            //  Button: "exports-loader?Button!bootstrap/js/dist/button",
            //  Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            //  Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            //  Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            //  Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            //  Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            //  Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            //  Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            //  Util: "exports-loader?Util!bootstrap/js/dist/util"
            //}),
            new AureliaPlugin({ aureliaApp: 'boot' })
      ]
      .concat(
        [
          (module.isDebug === true) ? (
            // new BundleAnalyzerPlugin(),
            new webpack.SourceMapDevToolPlugin({
              filename: '[file].map', // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
          ) : (
            //   new BundleAnalyzerPlugin(),
            new webpack.optimize.UglifyJsPlugin({
              compress: { warnings: false },
              output: { comments: false, beautify: false },
              ecma: 8
            })
          )
        ])
  }];
}
