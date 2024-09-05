import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {ModifySourcePlugin, ConcatOperation} from 'modify-source-webpack-plugin';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@apis': path.resolve(__dirname, 'src/apis/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@mocks': path.resolve(__dirname, 'src/mocks/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@errors': path.resolve(__dirname, 'src/errors/'),
      '@HDesign': path.resolve(__dirname, 'src/components/Design/'),
      '@HDcomponents': path.resolve(__dirname, 'src/components/Design/components/'),
      '@HDassets': path.resolve(__dirname, 'src/components/Design/assets/'),
      '@HDutils': path.resolve(__dirname, 'src/components/Design/utils/'),
      '@token': path.resolve(__dirname, 'src/components/Design/token/'),
      '@theme': path.resolve(__dirname, 'src/components/Design/theme/'),
      '@layouts': path.resolve(__dirname, 'src/components/Design/layouts/'),
      '@type': path.resolve(__dirname, 'src/components/Design/type/'),
    },
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
      hash: true,
      favicon: './favicon.ico',
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
  ],
};
