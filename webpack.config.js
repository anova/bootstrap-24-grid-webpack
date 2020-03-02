const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(_, argv) {
    const mode = argv.mode = 'development' ? 'development' : 'production';
    return {
        context: __dirname,
        entry: {
            main: './src/entry/main.js'
        },
        output: {
            path: __dirname + '/dist/',
            filename: 'js/[name]-[chunkhash:5].js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "src/html/index.html",
                inject: true,
                chunks: "all"
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name]-[chunkhash:5].css',
                outputPath: __dirname + '/dist/',
                publicPath: '/'
            })
        ]
    };
};
