var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var watchify = require("watchify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));


function bundle() {
  return watchedBrowserify
  .transform('babelify', {
    presets: ['es2015', 'stage-0'],
    extensions: ['.ts'],
    plugins: ['transform-runtime']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'));
}

gulp.task('default', bundle);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);