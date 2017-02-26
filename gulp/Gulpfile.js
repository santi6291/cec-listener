'use strict';
// gulp plugins
const gulp = require('gulp');
const sass = require('gulp-sass');

const scss = require('./task/scss.js');
const browserify = require('./task/browserify.js');

/**
 * Build scss to static directory and EE css directory
 * create source map
 * cross browser with autoprefixer
 */
gulp.task('scss', scss);


/**
 * Build Js modules
 */
gulp.task('browserify', browserify);

/**
 * build static FE assets
 */
gulp.task('build', [
	'scss',
	'browserify',
]);

/**
 * watch & build static assets
 */
// watch only build development tasks
gulp.task('watch', require('./task/watch.js'));

// build assets with destributions tasks
gulp.task('default', ['build']);
