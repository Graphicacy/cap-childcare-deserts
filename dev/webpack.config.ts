import * as HTMLPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import { templateContent } from '../src/Template';

const AnalyzePlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // tslint:disable-line
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin'); // tslint:disable-line

export default function(env: any = {}) {
  const config: webpack.Configuration = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundles/main.js',
      path: path.join(__dirname, '../public')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
      mainFields: ['module', 'jsnext:main', 'browser', 'main']
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            configFileName: '../src/tsconfig.json'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        },
        {
          /**
           * inline + minimize logo
           */
          test: /\.png$/i,
          use: ['url-loader', 'img-loader?limit=20000']
        }
      ]
    },

    devServer: {
      contentBase: path.join(__dirname, '../public')
    },

    plugins: [
      new webpack.DefinePlugin({
        __ACCESS_TOKEN__: JSON.stringify(require('../keys.json').accessToken),
        __DEV__: JSON.stringify(!env.prod),
        'process.env.NODE_ENV': JSON.stringify(
          env.prod ? 'production' : 'development'
        )
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HTMLPlugin({
        filename: 'index.html',
        templateContent,
        ...env.inline ? { inlineSource: '.(js|css)$' } : {}
      }),
      ...(env.analyze ? [new AnalyzePlugin()] : [])
    ]
  };

  if (env.prod) {
    config!.plugins!.push(
      new webpack.optimize.UglifyJsPlugin(
        {
          compress: {
            warnings: false,
            comparisons: false
          }
        } as any
      ),
      new HtmlWebpackInlineSourcePlugin()
    );
  }

  return config;
}
