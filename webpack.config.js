var ExtractTextPlugin = require("extract-text-webpack-plugin");
let ngTools = require('@ngtools/webpack');
let path = require('path');

module.exports = {
     entry: {
        app: './src/ng-app/main-dev.ts'
     },
     output: {
         path: './dist',
         filename: 'app.bundle.js'
     },
     devtool: "source-map", 
     resolve: {
       extensions: ['.ts', '.js', '.scss', '.html']
     },
     module: {
         loaders: [
         { 
         	test: /\.scss$/, 
         	loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap') 
         },
         {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']    
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
          },
          {
                  test: /\.json$/,
                  use: 'json-loader'
           }
         ]
       },
       plugins: [
             new ExtractTextPlugin("styles.css"),
             // new ngTools.AotPlugin({
             //       tsConfigPath: path.join(process.cwd(), 'tsconfig.aot.json'),
             //       baseDir: process.cwd(),
             //       entryModule: path.join(process.cwd(), 'src', 'app', 'app.module') + '#AppModule'
             //     }),
     	]
 };