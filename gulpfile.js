/*
  use: https://github.com/isaacs/node-glob
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var bundle = require('gulp-bundle-assets');
var watch = require('gulp-watch');
var notify = require('gulp-notify');
var del = require('del');
var size = require('gulp-size');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
//var svgSprite = require('gulp-svg-sprite');
//var uglify = require('gulp-uglify');
var nunjucksRender = require('gulp-nunjucks-render');
//var fs = require("fs");
var autoprefixer = require('gulp-autoprefixer');
var data = require('gulp-data');


var srcBasePath = __dirname + "/source";
var targetBasePath = __dirname + "/target";


/**
 * gulp clean - clean target folder for new init
 */
gulp.task('clean', function (cb) {
  del.sync([targetBasePath + '/**'], cb);
});

/**
 * simple generating local fonts for target
 */
 gulp.task('fonts', function() {
   gulp.src(srcBasePath + '/assets/fonts/*')
       .pipe(gulp.dest(targetBasePath + '/assets/fonts/'));
 });

 /**
  * simple generating imgs from src to tgt
  */
  gulp.task('images', function() {
    gulp.src(srcBasePath + '/assets/img/**/*')
        .pipe(gulp.dest(targetBasePath + '/assets/img/'));
  });

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {

  var basePathCss = targetBasePath + '/css';

  return gulp.src(srcBasePath + '/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      noCache: true,
      // outputStyle: "compressed",
      lineNumbers: false,
      loadPath: basePathCss + '/*',
      sourceMap: true,
    })).on('error', function (error) {
      gutil.log(error);
      this.emit('end');
      return notify().write(error);
    })
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(basePathCss))
    .pipe(browserSync.stream())
    .pipe(notify({
      title: "prototype: SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }))
    .pipe(size({
      title: 'SASS'
    }));
});


/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
gulp.task('bundle', function () {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(bundle.results(targetBasePath)) // arg is destination of bundle.result.json
    .pipe(gulp.dest(targetBasePath))
    // .pipe(notify({
    //   title: "title: bundled",
    //   message: "All JavaScript and other static stuff have been bundled and moved to target.",
    //   onLast: true
    // }))
    .pipe(size({
      title: 'Bundle'
    }));
});

/**
  * this taks defines the nunjucks rendering
  * read from single json file
  * TODO make read from serveral json files
  */
gulp.task('nunjucks', ['bundle'], function () {
  var bundleResultFilename = targetBasePath + "/bundle.result.json";
  var bundeResult = require(bundleResultFilename);

  return gulp.src(srcBasePath + '/templates/*.html')
    .pipe(data(function() {
      return require(srcBasePath + '/data/data.json');
    }))
    .pipe(nunjucksRender({
      envOptions: {
        autoescape: false,
      },
      data: {
        bundleResult: bundeResult
      },
      path: [
        srcBasePath + '/templates',
        srcBasePath + '/partials',
        srcBasePath + '/partials/components',
        srcBasePath + '/partials/component-groups',
        srcBasePath + '/partials/landmarks',
        srcBasePath + '/macros',
      ]
    }))
    .pipe(gulp.dest(targetBasePath))
    .pipe(notify({
      title: "title: nujucks",
      message: "All nunjucks templates have been rendered and moved to target.",
      onLast: true
    }))
    .pipe(size({
      title: 'Nunjucks'
    }));
});


/**
 * gulp default task - just call 'gulp' in console
 */
gulp.task('default', ['fonts', 'images', 'sass', 'bundle', 'nunjucks']);

/**
 * Defines the gulp watcher task.
 */
gulp.task('watch', ['default'], function () {
  gulp.watch([srcBasePath + '/sass/**/*.scss'], ['sass']);

  gulp.watch([srcBasePath + '/assets/js/**/*.js'], ['bundle']);

  gulp.watch([srcBasePath + '/**/*.html'], ['nunjucks']);

});

/**
 *  gulp serve Static Server + watching scss/html files
 */
gulp.task('serve', ['watch'], function() {

  // init browser snyc
  browserSync.init({
    reloadThrottle: 200,
    reloadDelay: 200,
    server: targetBasePath
  });

  // watches for bundled or rendered js files or nunjucks templates
  gulp.watch([
    targetBasePath + "/**/*.js",
    targetBasePath + "/**/*.html",
    targetBasePath + "/**/*.css"
  ]).on('change', browserSync.reload);
});
