const path = require('path');
const webpack = require('webpack');

// Import dependencies.
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, arg) => {
  const isProduction = arg.mode === 'production' ? true : false;
  return {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'js/[name].bundle.js',
      filename: 'js/[name].js',
      publicPath: '/',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: [new TerserPlugin({ parallel: true })],
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        // Javascript
        {
          test: /\.(js)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: 'defaults',
                    },
                  ],
                ],
                plugins: [['babel-plugin-styled-components', { pure: true }]],
              },
            },
            {
              loader: 'stylelint-custom-processor-loader',
              options: {
                configPath: path.resolve(__dirname, '.stylelintrc'),
              },
            },
          ],
        },
        // CSS
        {
          test: /\.(css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: { path: path.resolve(__dirname, 'postcss.config.js') },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // Assets
        {
          test: /\.(woff|woff2|eot|ttf|svg|ico|jpe?g|png)$/,
          use: 'file-loader',
        },
      ],
    },
    /**
     * Plugins.
     *
     * Add all common plugins.
     *
     * MiniCssExtractPlugin()
     * A Lightweight CSS extraction webpack plugin.
     */
    plugins: [
      new HtmlWebpackPlugin({
        template: 'app/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css',
        path: path.resolve(__dirname, 'dist'),
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new FixStyleOnlyEntriesPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ],
    stats: 'errors-only',
  };
};
