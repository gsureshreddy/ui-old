var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
    return (del([
        // Delete files with following pattern
        'dist/web/**/*',
        // Delete other than the one listed here
        '!dist/web/module.json'
    ]));
});

gulp.task('default', function () {
    console.log("Executing default task")
});
