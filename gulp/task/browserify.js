'use strict';
const path = require('../helpers/paths.js');
const argv = require('yargs').argv;

const gulp = require('gulp');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');


const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

const es2015 = require('babel-preset-es2015');
const babelify = require('babelify');



let bConfig = {}
bConfig.debug = argv.production ? false : true;
bConfig.entries = path.src.js;

module.exports = ()=>{
    let b = browserify(bConfig.entries);
    return b.transform("babelify", {presets: ["es2015"]})
        .bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dest.js))
    .pipe( notify("Browserify - Successful") );
}
