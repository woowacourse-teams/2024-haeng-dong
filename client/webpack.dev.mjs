import path from 'path';
import {merge} from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common.mjs';
import {fileURLToPath} from 'url';
import {sentryWebpackPlugin} from '@sentry/webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: 'source-map',
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
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'wtc-o6',
      project: 'javascript-react',
    }),
  ],
});
