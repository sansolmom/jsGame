const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {

  const config = {
    entry: {
      app: [
        './src/index.js'
      ]
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve('dist')
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },

    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader"
          }]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
                useRelativePath: true,
                limit: 10000
            }
          }]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./public/index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
        // chunkFilename: "[id].css"
      })
    ]

  };


  if(options.mode === 'development') {
    //... Development 설정
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )

    config.devtool = 'source-map';

    config.devServer = {
      hot: true,
      inline: true,
      host: 'localhost', // 디폴트로는 "localhost" 로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정해야 한다.,
      port: 5500,
      contentBase: [
        path.resolve('public'),
      ], // 개발서버의 루트 경로
      watchContentBase: true
    }

  } else {
    //... Production 설정
   config.plugins = [
      new CleanWebpackPlugin(['dist'])
    ];
  }

  return config;

};