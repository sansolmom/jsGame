const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
    const config = {
        entry: {
            app:['./src/index.js']
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            splitChunks : {
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
            rules: [
                {
                    test: /\.js$/,
                    use: {
                      loader: "babel-loader",
                      options: { presets: ["es2015"] }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        /* devMode ? 'style-loader' : */
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png |jpe?g|gif|svg|ico)$/,
                    use: [
                        {
                            loader : 'url-loader',
                            options: {
                                useRelativePath: true,
                                limit: 10000
                            }
                        }
                    ]
                }
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ]
    }

    if(options.mode === 'development') {
    //... Development 설정
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title : 'Devlopment',
                showErrors: true // 에러 발생 시 메세지를 브라우저 화면에 노출한다.
            })
        ];

        config.devtool = 'inline-source-map';

        config.devServer = {
            hot: true, // 서버에서 HMR을 켠다.
            host: '0.0.0.0', // 디폴트로는 'localhost'로 잡혀있다. 외부에서 개발서버에 접속해서 테스트 하기 위해서는 '0.0.0.0'으로 설정해야 한다.
            contentBase: path.resolve(__dirname,'dist'),  // 개발서버의 루트 경로
            status: {
                color: true
            }
        };
    } else {
    //... Production 설정
        config.plugins = [
            new CleanWebpackPlugin(['dist'])
        ];
    }

    return config;
}