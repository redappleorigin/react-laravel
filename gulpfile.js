var elixir = require('laravel-elixir');
var fs = require('fs');
var path = require('path');
var webpack = require('./elixir/laravel-elixir-webpack-ex');
var _ = require ('lodash');

var views_path = path.resolve(__dirname, './resources/views');

var entries = ((views_path) => {
    return fs.readdirSync(views_path)
        .reduce((carry, current) => {
            var folder_name = current;

            if (fs.statSync(path.join(views_path, folder_name)).isDirectory()) {
                try {
                    var file_name = `${folder_name}.page.js`;
                    fs.statSync(path.join(views_path, folder_name, file_name));

                    carry[_.capitalize(folder_name)] = `${folder_name}/${file_name}`;
                } catch (exception) {}
            }

            return carry;
        }, {})
    ;
})(views_path);

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var webpackOptions = () => {
    return {
        entry: {
            react: ['react', 'react-dom'],
        },
        module: {
            loaders: [
                {
                    test: /.js?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('react', 'react.bundle.js'),
        ]
    };
};

 elixir((mix) => {
     mix.webpack(
         entries,
         webpackOptions(),
         'public/js',
         'resources/views'
     );
 });
