'use strict';

/*
 * gulpfile.js
 * ===========
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in the 'gulp' folder. Any files in that directory get
 *  automatically required below.
 *
 * To add a new task, simply add a new task file in that directory.
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

// Specify paths & globbing patterns for tasks.
global.paths = {
    // HTML sources.
    'html': './src/*.html',
    // JS sources.
    'js': ['./src/js/**/*.js', './src/js/**/*.jsx'],
    // react components
    'components': './src/js/**/*.jsx',
    // SASS sources.
    'sass': './src/css/*.scss',
    // Image sources.
    'img': './src/img/*',
    // Font Resources
    'fonts': './src/fonts/*',
    // Sources folder.
    'src': './src',
    // Compiled CSS folder.
    'css': './dist/css',
    // Distribution folder.
    'dist': './dist'
};

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {recurse: false});

// copy the libs in the beginning
gulp.task('js-libs', function () {
    gulp.src(['./jspm_packages/**/*.*']).pipe(gulp.dest(global.paths.dist + '/jspm_packages'));
});

// copy the config
gulp.task('js-config', function () {
    gulp.src(['./src/config.js']).pipe(gulp.dest(global.paths.dist));
});

// Default task; start local server & watch for changes.
gulp.task('default', ['clean', 'html', 'fonts', 'js-config', 'js-libs', 'js', 'sass', 'connect', 'watch']);
