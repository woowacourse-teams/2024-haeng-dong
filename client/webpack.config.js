import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {ModifySourcePlugin, ConcatOperation} from 'modify-source-webpack-plugin';
import {fileURLToPath} from 'url';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config({path: path.join(__dirname, '.env')});

export default {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@apis': path.resolve(__dirname, 'src/apis/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@mocks': path.resolve(__dirname, 'src/mocks/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ModifySourcePlugin({
      rules: [
        {
          test: /\.tsx$/i,
          operations: [new ConcatOperation('start', '/** @jsxImportSource @emotion/react */\n\n')],
        },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
};