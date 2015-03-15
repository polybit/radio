var gulp = require('gulp');
var react = require('gulp-react');
var browserSync = require('browser-sync');

var srcDir = 'src/';
var dstDir = 'radio/static/';

function swallowError(e) {
    console.error(e.message + '\n  in ' + e.fileName);
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:5000"
    });
});

gulp.task('compile-jsx', function() {
  return gulp.src([srcDir + '**/*.jsx', srcDir + '**/*.js'])
        .pipe(react())
        .on('error', swallowError)
        .pipe(gulp.dest(dstDir))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['compile-jsx', 'move', 'browser-sync'], function() {
    gulp.watch([srcDir + '**/*.jsx', srcDir + '**/*.js'], ['compile-jsx']);
    gulp.watch([srcDir + '**/*.html'], ['move']);
});

// Move everything non-jsx from src -> static
gulp.task('move', function() {
    return gulp.src([srcDir + '**/*.html'])
          .pipe(gulp.dest(dstDir))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['compile-jsx', 'move']);

