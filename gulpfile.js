var gulp = require('gulp');
var react = require('gulp-react');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

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

gulp.task('sass', function () {
    gulp.src(srcDir + 'scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dstDir + 'css/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['compile-jsx', 'sass', 'move', 'browser-sync'], function() {
    gulp.watch([srcDir + '**/*.jsx', srcDir + '**/*.js'], ['compile-jsx']);
    gulp.watch([srcDir + 'scss/**/*.scss'], ['sass']);
    gulp.watch([srcDir + '**/*.html'], ['move']);
});

// Move everything non-jsx from src -> static
gulp.task('move', function() {
    return gulp.src([srcDir + '**/*.html'])
          .pipe(gulp.dest(dstDir))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['compile-jsx', 'sass', 'move']);

