import * as webpack from 'webpack';
import * as HTMLPlugin from 'html-webpack-plugin';
import * as path from 'path';

const AnalyzePlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const templateContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Childcare Deserts</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto+Slab:700" rel="stylesheet">
    <style>
      html {
        box-sizing: border-box;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
    </style>
  </head>
  <body><div id="root"></div></body>
</html>
`.trim();

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
      mainFields: ['module', 'jsnext:main', 'browser', 'main'],
      alias: {
        /**
         * alias all react stuff to preact
         */
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'react-redux': 'preact-redux',
        'create-react-class': 'preact-compat/lib/create-react-class'
      }
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
          use: ['url-loader', 'img-loader']
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
        ...env.prod || env.inline ? { inlineSource: '.(js|css)$' } : {}
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
