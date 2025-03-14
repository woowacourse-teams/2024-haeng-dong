import path from 'path';
import {merge} from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common.mjs';
import {fileURLToPath} from 'url';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
    new ForkTsCheckerWebpackPlugin(),
  ],
  
});
