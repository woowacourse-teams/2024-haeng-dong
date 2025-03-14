import path from 'path';
import {merge} from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import common from './webpack.common.mjs';
import {fileURLToPath} from 'url';
// import {sentryWebpackPlugin} from '@sentry/webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[id].[contenthash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'nosources-source-map',
  plugins: [
    new Dotenv({
      path: '.env.prod',
    }),
    // sentryWebpackPlugin({
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   org: 'wtc-o6',
    //   project: 'javascript-react',
    //   sourcemaps: {
    //     filesToDeleteAfterUpload: ['**/*.js.map', '**/*.css.map', '**/*.LICENSE.txt'],
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // 가능한 모든 코드를 압축
            drop_console: true, // 콘솔 로그를 제거하여 파일 크기 감소
          },
          mangle: true, // 변수 및 함수 이름을 짧게 변경
          output: {
            comments: false, // 주석을 제거
          },
        },
        extractComments: false, // 별도의 파일로 주석을 추출하지 않음
        parallel: true, // 멀티 프로세스를 사용하여 빌드 속도 향상
      }),
    ],
  },
});
