'use strict';
// paths
const path = require('../helpers/paths.js');
const argv = require('yargs').argv;

// gulp plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require("gulp-notify");

// scss plugins
const autoprefixer = require('gulp-autoprefixer');

let scssConfig = {}
scssConfig.outputStyle = argv.production ? 'compressed' : 'expanded'
scssConfig.sourceMapEmbed = argv.production ? false : true;

const prefixConf = {
    browsers: [
    'last 2 versions',
    'ie >= 9',
    'iOS >= 5'
    ]
}
module.exports = () => {
    return gulp.src(path.src.scss)
        .pipe(
            sass(scssConfig)
            .on('error', sass.logError)
        )
        .pipe( autoprefixer(prefixConf) )
        .pipe(gulp.dest(path.dest.css))
    .pipe( notify("SCSS - Complete") );
}
