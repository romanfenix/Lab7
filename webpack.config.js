const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    styles: path.resolve(__dirname, './scss/index.scss'),
    print: path.resolve(__dirname, './scss/print.scss') // Add print.scss as an entry
  },  
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Головна',
      template: path.resolve(__dirname, './src/pages/index.html'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Розклад',
      template: path.resolve(__dirname, './src/pages/rozklad.html'),
      filename: 'rozklad.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Новини',
      template: path.resolve(__dirname, './src/pages/news.html'),
      filename: 'news.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Фотоальбом',
      template: path.resolve(__dirname, './src/pages/photo.html'),
      filename: 'photo.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/assets/images'), to: 'assets/images' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Здесь задаем имя выходного файла CSS
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 80,
    historyApiFallback: true,
    open: true,
  },
};