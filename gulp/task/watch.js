'use strict';
const path = require('../helpers/paths.js').watch;

const gulp = require('gulp');

module.exports = () => {
    gulp.watch(path.scss, ['scss']);
    gulp.watch(path.js, ['browserify']);
}
