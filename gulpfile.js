var gulp = require('gulp');
var react = require('gulp-react');
var watch = require('gulp-watch');

var staticDir = 'radio/static';

gulp.task('compile-jsx', function() {
  return gulp.src(staticDir + '/jsx/**/*.jsx')
        .pipe(react())
        .on('error', function(e) {
            console.error(e.message + '\n  in ' + e.fileName);
        })
        .pipe(gulp.dest(staticDir + '/js/modules/'));
});

gulp.task('watch', function() {
      gulp.watch(staticDir + '/jsx/**/*.jsx', ['compile-jsx']);
});

