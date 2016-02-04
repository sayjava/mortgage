var gulp = require('gulp');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");

// JavaScript livereload.
gulp.task('js', function () {
    gulp.src(global.paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            sourceMaps: true
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(global.paths.dist + '/js'))
        .pipe(connect.reload());
});