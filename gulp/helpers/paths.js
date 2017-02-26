'use strict';
const join = require('path').join;

// Absolute paths to project
const projectRoot = join(__dirname, '../..');
// reference for FE js modules
const nodeModules = projectRoot + '/node_modules';
const frontEnd = projectRoot+'/app/web-app';
// path to export for Gulp use
var paths = {};

// Absolute path to source files
paths.src = {};
paths.src.scss = frontEnd + '/src/scss/*.scss',

paths.src.js = [
    // main JS file
    frontEnd + '/src/js/app.js',
]

// Directories to watch
paths.watch = {
    scss: frontEnd + '/src/scss/**/*.scss',
    js: frontEnd + '/src/js/**/*.js',
};

// where to drop compiled files
paths.dest = {
    css: frontEnd + '/public/css/',
    js: frontEnd + '/public/js/'
};

module.exports = paths;
