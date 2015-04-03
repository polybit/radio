var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var reactify = require('reactify');


var path = {
  SCSS: './src/scss/**/*.scss',
  HTML: './src/index.html',
  IMAGES: './src/img/**/*',
  OUT: 'build.js',
  DEST_HTML: './radio/static',
  DEST_IMAGES: './radio/static/img',
  DEST_JS: './radio/static/js',
  DEST_CSS: './radio/static/css',
  ENTRY_POINT: './src/js/main.jsx'
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

    gulp.src(path.IMAGES)
        .pipe(gulp.dest(path.DEST_IMAGES))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    gulp.src(path.SCSS)
        .pipe(sass())
        .pipe(gulp.dest(path.DEST_CSS))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'copy', 'browser-sync'], function() {
    gulp.watch(path.HTML, ['copy']);
    gulp.watch(path.SCSS, ['sass']);

    var watcher  = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        extensions: ['.jsx'],
    }));

    return watcher.on('update', function () {
        watcher.bundle()
               .pipe(source(path.OUT))
               .pipe(gulp.dest(path.DEST_JS))
               .pipe(browserSync.reload({stream: true}));
    })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        extensions: ['.jsx'],
    })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('default', ['sass', 'copy', 'build']);

