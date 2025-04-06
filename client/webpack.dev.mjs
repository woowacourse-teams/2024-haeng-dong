import path from 'path';
import {merge} from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common.mjs';
import {fileURLToPath} from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const branchName = process.env.BRANCH_NAME;

export default merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: branchName ? `/${branchName}/` : '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new Dotenv({
      path: '.env.dev',
    }),
    new webpack.DefinePlugin({
      'process.env.BRANCH_NAME': JSON.stringify(process.env.BRANCH_NAME ?? ''),
    }),
  ],
});
