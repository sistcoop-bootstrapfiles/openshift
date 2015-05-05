'use-strict'

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var rename = require("gulp-rename");

gulp.task('bower', function() {
    return bower();
});

gulp.task('clean', function () {
    return gulp.src('./dist/**/**.*', {read: false})
        .pipe(clean());
});

gulp.task('less', function () {
    return gulp.src('./src/less/main.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(rename({
        extname: '.min.css'
    }))
    .pipe(gulp.dest('./dist/css'));

gulp.src(['bower_components/patternfly/components/**']).pipe(gulp.dest('components'));
gulp.src(['bower_components/fontawesome/fonts/**']).pipe(gulp.dest('fonts'));
gulp.src(['bower_components/patternfly/dist/fonts/**']).pipe(gulp.dest('fonts'));
gulp.src(['bower_components/patternfly/dist/img/**']).pipe(gulp.dest('dist/img'));

gulp.src(['src/fonts/**']).pipe(gulp.dest('fonts'));
gulp.src(['src/img/**']).pipe(gulp.dest('dist/img'));

gulp.task('default', ['bower', 'clean', 'less']);
