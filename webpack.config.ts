import * as webpack from 'webpack';
import * as HTMLPlugin from 'html-webpack-plugin';
import * as path from 'path';

const templateContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`.trim();

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundles/main.js',
    path: __dirname + '/public'
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
          compilerOptions: {
            module: 'es2015',
            target: 'es3'
          }
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public')
  },

  plugins: [
    new webpack.DefinePlugin({
      __ACCESS_TOKEN__: JSON.stringify(require('./keys.json').accessToken)
    }),
    new HTMLPlugin({
      filename: 'index.html',
      templateContent
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

export default config;
