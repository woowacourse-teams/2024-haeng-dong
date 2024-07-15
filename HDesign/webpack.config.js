import path from 'path';
import {fileURLToPath} from 'url';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {ModifySourcePlugin, ConcatOperation} from 'modify-source-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './lib/index.ts',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ModifySourcePlugin({
      rules: [
        {
          test: /\.tsx$/i,
          operations: [new ConcatOperation('start', '/** @jsxImportSource @emotion/react */\n\n')],
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
  },
};
