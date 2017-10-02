const webpack = require("webpack");
const path = require("path");

module.exports = {
    devtool: 'eval-source-map',
    resolve : {
        alias : {
            "containers"  : path.resolve(__dirname, "./src/containers"), 
            "components"  : path.resolve(__dirname, "./src/components"),
            "actions"     : path.resolve(__dirname, "./src/actions"),
            "sagas"       : path.resolve(__dirname, "./src/sagas"),
            "middlewares" : path.resolve(__dirname, "./src/middlewares")
        }    
    },
    entry : [
        'babel-polyfill',
        './src/index.js',
    ],
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'bundle.js',
        publicPath : '/static'
    },
    node : {
        fs: "empty",
        path : true
    },
    module: {
        rules: [
            {   test: /\.js$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            { 
                test: /\.jsx$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/, 
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            }
        ]
        
    },
    plugins : [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      filename : 'bundle.js',
      compress: true,
      hot : true,
      inline : true,
      lazy : false,
      clientLogLevel : 'error',
      public : 'redux-test-pashoo.c9users.io',
      port: process.env.PORT,
      host: process.env.IP,
      publicPath : '/static'
    }
};