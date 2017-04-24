var gulp                = require('gulp');
var del                 = require('del');
var concat              = require('gulp-concat');
var angularFilesort     = require('gulp-angular-filesort');
var angularModuleSort   = require('gulp-ng-module-sort')

gulp.task('clean', function () {
    return (del([
        // Delete files with following pattern
        'dist/**/*',
        // Delete other than the one listed here
        '!dist/module.json',
        'release/**/*'
    ]));
});

/**
 * Core Module Tasks
 */
gulp.task('core:scripts', function () {
    return gulp.src(['core/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.core.js'))
        .pipe(gulp.dest('release/'));
});

/**
 * Layout Module Tasks
 */
gulp.task('layout:scripts', function () {
    return gulp.src(['layout/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.layout.js'))
        .pipe(gulp.dest('release/'));
})

/**
 * Navigation Module Tasks
 */
gulp.task('navigation:scripts', function () {
    return gulp.src(['navigation/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.navigation.js'))
        .pipe(gulp.dest('release/'));
})

gulp.task('scripts', ['core:scripts', 'layout:scripts', 'navigation:scripts'], function () {
    return gulp.src(['release/ui.core.js',
        'release/ui.navigation.js',
        'release/ui.layout.js'])
        .pipe(concat('ui.all.js'))
        .pipe(gulp.dest('release/'));
})
gulp.task('default',['clean', 'scripts'], function () {
    console.log("Executing default task")
});