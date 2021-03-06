import * as path from 'path';
import {babelLoader, tsLoaderFactory} from '../webpack-loaders';

module.exports = ({
    mode: getMode(),

    externals: {
        angular: 'angular'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                include: [/src/],
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                include: [/(src)|(test)/],
                use: [
                    babelLoader,
                    tsLoaderFactory('tsconfig.frontend.json')
                ]
            },
            {
                test: /\.(js|ts)$/,
                enforce: 'post',
                loader: 'istanbul-instrumenter-loader',
                exclude: [/((\.spec\.)|test|node_modules)/],
                options: {
                    esModules: true
                }
            },
            {
                test: /(\.less$)|(\.css$)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /(\.sass$)|(\.scss$)/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.tpl.pug/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, '..', 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader'
                    }
                ]
            },
            {
                test: /\.tpl.html$/,
                use: [
                    {
                        loader: 'ngtemplate-loader',
                        options: {
                            relativeTo: path.resolve(__dirname, '..', 'src')
                        }
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.woff/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            utils: path.resolve(__dirname, 'utils')
        }
    },

    watch: true,

    devtool: 'inline-source-map'
});

function getMode() {
    if (process.env.DEVELOPMENT_MODE === 'true') {
        // tslint:disable-next-line:no-console
        console.warn('Forcing webpack mode to development!');

        return 'development';
    } else {
        return 'production';
    }
}
