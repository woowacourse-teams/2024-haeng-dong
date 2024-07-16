import path from 'path';
import {fileURLToPath} from 'url';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {ModifySourcePlugin, ConcatOperation} from 'modify-source-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: path.resolve(__dirname, './src/lib/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'haengdong-design',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    react: 'React',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
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
