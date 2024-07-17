const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.style.js|style.ts$/,
        use: ['url-loader'],
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    static: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@token': path.resolve(__dirname, './src/token'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
