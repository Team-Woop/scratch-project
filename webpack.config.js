const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./client/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        }
      },
      {
        test: /\.(css|scss)$/, ///\.s[ac]ss$/i
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './client/index.html'
  })],
  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
    },
    host: 'localhost',
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    open: true,
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};