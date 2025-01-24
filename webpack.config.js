import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

// Получаем __dirname через import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV || 'development',

  // Точка входа
  entry: './src/services.js',

  // Выходные файлы
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  module: {
    rules: [
      // Обработка JavaScript (ES6+)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // Обработка CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Обработка SCSS/SASS
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      // Обработка шрифтов
      {
        test: /\.woff2?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: 'file-loader',
      },
      // Обработка изображений (если нужно)
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    // Генерация HTML-файла
    new HtmlWebpackPlugin({
      template: 'index.html', // Укажите ваш HTML-шаблон
    }),
  ],

  resolve: {
    // Настройка расширений
    extensions: ['.js'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true, // Автоматически открывать браузер
    hot: true, // Включение HMR
  },
};



