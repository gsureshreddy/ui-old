var gulp                = require('gulp');
var del                 = require('del');
var concat              = require('gulp-concat');
var angularFilesort     = require('gulp-angular-filesort');
var sass                = require('gulp-sass');
var mainBowerFiles      = require('gulp-main-bower-files');
var runSequence         = require('run-sequence');
var templateCache       = require('gulp-angular-templatecache');
var browserSync         = require('browser-sync').create();

gulp.task('clean', function () {
    return (del([
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
gulp.task('core:templates', function () {
    return gulp.src(['core/src/**/*.html'])
        .pipe(templateCache('ui.core.templates.js', {
            //standalone: true,
            module  : 'ui.core',
            root    : 'ui/core'
        }))
        .pipe(gulp.dest('release/'));
});

gulp.task('core:build',['core:scripts', 'core:templates']);
/**
 * Layout Module Tasks
 */
gulp.task('layout:scripts', function () {
    return gulp.src(['layout/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.layout.js'))
        .pipe(gulp.dest('release/'));
});

gulp.task('layout:sass', function () {
    return gulp.src([
            'core/src/scss/**/*.scss',
            'layout/src/**/*.scss'])
        .pipe(concat('ui.layout.scss'))
        .pipe(sass({ atomic_save: true}))
        .pipe(concat('ui.layout.css'))
        .pipe(gulp.dest('release/'));
});

gulp.task('layout:templates', function () {
    return gulp.src(['layout/src/**/*.html'])
        .pipe(templateCache('ui.layout.templates.js', {
            //standalone: true,
            module : 'ui.layout',
            root    : 'ui/layout'
        }))
        .pipe(gulp.dest('release/'));
});

gulp.task('layout:build',['layout:scripts', 'layout:sass', 'layout:templates']);

/**
 * Navigation Module Tasks
 */
gulp.task('navigation:scripts', function () {
    return gulp.src(['navigation/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.navigation.js'))
        .pipe(gulp.dest('release/'));
});

gulp.task('navigation:templates', function () {
    return gulp.src(['navigation/src/**/*.html'])
        .pipe(templateCache('ui.navigation.templates.js', {
            //standalone: true,
            module : 'ui.navigation',
            root    : 'ui/navigation'
        }))
        .pipe(gulp.dest('release/'));
});
gulp.task('navigation:build',['navigation:scripts','navigation:templates']);

/**
 * Release Tasks
 */
gulp.task('scripts', function () {
    return gulp.src([
            'release/ui.core.js',
            'release/ui.core.templates.js',
            'release/ui.navigation.js',
            'release/ui.navigation.templates.js',
            'release/ui.layout.js',
            'release/ui.layout.templates.js',
            'all/src/all-modules.js'])
        .pipe(concat('ui.all.js'))
        .pipe(gulp.dest('release/'));
});

gulp.task('styles', function () {
    return gulp.src([
        'release/ui.core.css',
        'release/ui.navigation.css',
        'release/ui.layout.css'])
        .pipe(concat('ui.all.css'))
        .pipe(gulp.dest('release/'));
});

/**
 * Complete Build
 */
gulp.task('default',['clean'], function () {
    runSequence('core:build', 'layout:build', 'navigation:build','scripts');
});

/* ################################################################################################################## */
/**
 * Demo Build
 */
gulp.task('demo:clean', function () {
    return (del([
        // Delete files with following pattern
        'demo/dist/**/*',
        // Delete other than the one listed here
        '!demo/dist/module.json'
    ]));
});

gulp.task('demo:scripts:bower', function () {
    return gulp.src(['bower.json'])
        .pipe(mainBowerFiles())
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('demo/dist/'));
});

gulp.task('demo:scripts', function () {
    return gulp.src(['demo/src/**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ui.demo.js'))
        .pipe(gulp.dest('demo/dist/'))
        .pipe(browserSync.stream());
});

gulp.task('demo:templates', function () {
    return gulp.src(['demo/src/**/*.html'])
        .pipe(templateCache('ui.demo.templates.js', {
            //standalone: true,
            module : 'ui.demo',
            root    : 'ui/demo'
        }))
        .pipe(gulp.dest('demo/dist/'));
});

gulp.task('demo:copy', function  () {
    return gulp.src(['release/ui.all.js', 'release/ui.all.css'])
        .pipe(gulp.dest('demo/dist'))
        .pipe(browserSync.stream());
});

gulp.task('demo:html:index', function () {
    return gulp.src(['demo/src/index.html'])
        .pipe(gulp.dest('demo/dist/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./demo/dist/"
        }
    });

    gulp.watch("release/*.*",['demo:copy']);
    gulp.watch("demo/src/index.html",['demo:html:index']);
    gulp.watch("demo/src/**/*.js",['demo:scripts']);
    gulp.watch("demo/src/**/*.scss",['demo:sass']);
    gulp.watch(["demo/src/**/*.html","!demo/src/index.html"],['demo:templates']);
});

gulp.task('demo:build',['demo:clean'], function () {
    runSequence('demo:scripts:bower', 'demo:scripts', 'demo:html:index','demo:copy', 'browser-sync');
});
/* ################################################################################################################## */