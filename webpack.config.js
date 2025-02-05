import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV || 'development',

  entry: './src/services.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },

  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.json'],
    fallback: {
      "url": require.resolve("url/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "zlib": require.resolve("browserify-zlib"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "fs": false,
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
    hot: true,
  },
};




