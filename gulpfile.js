var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');


var path = {
  SCSS: './src/scss/**/*.scss',
  HTML: './src/index.html',
  OUT: 'build.js',
  DEST_HTML: './radio/static',
  DEST_JS: './radio/static/js',
  DEST_CSS: './radio/static/css',
  ENTRY_POINT: './src/js/main.js'
};

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:5000"
    });
});

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST_HTML))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(path.SCSS)
        .pipe(sass())
        .pipe(gulp.dest(path.DEST_CSS))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(path.HTML, ['copy']);
    gulp.watch(path.SCSS, ['sass']);

    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    return watcher.on('update', function () {
        watcher.bundle()
               .pipe(source(path.OUT))
               .pipe(gulp.dest(path.DEST_JS));
    })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['sass', 'copy', 'watch']);

