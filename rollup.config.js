import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { version } from './package.json';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'build/libersdk.min.js',
            format: 'iife',
            name: 'LiberSDK',
            sourcemap: 'inline',
            banner: '/* libersdk-js v' + version + '*/'
        }
    ],
    plugins: [
        json(),
        resolve({
            module: true,
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        eslint({
            exclude: [
                '*.json',
            ]
        }),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify())
    ]
};
