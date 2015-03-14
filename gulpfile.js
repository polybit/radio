var gulp = require('gulp');
var react = require('gulp-react');
var watch = require('gulp-watch');

var srcDir = 'src/';
var dstDir = 'radio/static/';

gulp.task('compile-jsx', function() {
  return gulp.src(srcDir + '**/*.jsx')
        .pipe(react())
        .on('error', function(e) {
            console.error(e.message + '\n  in ' + e.fileName);
        })
        .pipe(gulp.dest(dstDir));
});

gulp.task('watch', function() {
      gulp.watch(srcDir + '**/*.jsx', ['compile-jsx']);
});

// Move everything non-jsx from src -> static
gulp.task('default', ['compile-jsx'], function() {
    return gulp.src([srcDir + '**/*.html', srcDir + '**/*.js'])
          .pipe(gulp.dest(dstDir));
});

