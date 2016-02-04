'use strict';

var gulp = require('gulp');

gulp.task('fonts', function () {
    gulp.src(global.paths.fonts)
        .pipe(gulp.dest(global.paths.dist + '/fonts'));
});