const path = require('path');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true, 
  },
  mode: 'development', 
  module: {
    rules: [
      {
        test: /\.css$/i, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
        type: 'asset/resource',
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: './dist',
    open: true, 
    port: 8080, 
  },
};

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Исходный HTML-шаблон
      filename: 'index.html',      // Имя выходного HTML-файла
      title: 'My App',             // Заголовок страницы
    }),
  ],
  mode: 'development',
};

