// tslint:disable-next-line:no-var-requires
const path = require('path');

declare global {
    namespace NodeJS {
        interface Process {
            binding: (...args: any[]) => any;
        }
    }
}

const isDebugging = (() => {
    const TCPWrap = process.binding('tcp_wrap');
    const {TCP} = TCPWrap;
    const tcp = new TCP(TCPWrap.constants.SERVER);
    let error;

    function doBind() {
        let err = tcp.bind6('::', process.debugPort);
        if (err) {
            err = tcp.bind('0.0.0.0', process.debugPort);
        }

        return err;
    }

    doBind();

    error = doBind();

    if (error) {
        tcp.close();
        return false;
    }

    return true;
})();

export default (config) => {
    config.set({
        basePath: path.resolve(__dirname, '..'),

        frameworks: ['jasmine', 'webpack'],

        client: {
            jasmine: {
                random: false
            }
        },

        files: [
            path.resolve(__dirname, '..', 'node_modules', 'jquery', 'dist', 'jquery.js'),
            path.resolve(__dirname, '..', 'node_modules', 'angular', 'angular.js'),
            path.resolve(__dirname, '..', 'node_modules', 'angular-mocks', 'angular-mocks.js'),
            './test/all-tests.spec.ts'
        ],

        preprocessors: {
            '**/*.ts': ['webpack', 'sourcemap']
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-spec-reporter'),
            require('karma-source-map-support'),
            require('karma-sourcemap-loader'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-chrome-launcher')
        ],

        browsers: [isDebugging ? 'ChromiumNoSandbox' : 'ChromiumHeadlessNoSandbox'],

        customLaunchers: {
            'ChromiumHeadlessNoSandbox': {
                base: 'ChromiumHeadless',
                flags: [
                    '--disable-gpu',
                    '--no-sandbox'
                ],
                debug: true
            },
            'ChromiumNoSandbox': {
                base: 'Chromium',
                flags: [
                    '--disable-gpu'
                ],
                debug: true
            }
        },

        singleRun: !isDebugging,

        reporters: ['spec', 'coverage-istanbul'],

        webpack: require('./webpack.test.config'),

        webpackMiddleware: {
            stats: 'errors-only'
        },

        coverageIstanbulReporter: {
            reports: ['text-summary', 'html'],
            dir: path.resolve(__dirname, '..', 'reports', 'coverage'),
            fixWebpackSourcePaths: true,
            combineBrowserReports: true,
            'es-modules': true,
            thresholds: {
                emitWarning: false,

                global: {
                    statements: 90,
                    lines: 90,
                    branches: 80,
                    functions: 90
                }
            }
        }
    });
};
