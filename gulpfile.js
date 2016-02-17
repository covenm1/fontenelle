// gulpfile.js
// Include gulp
var gulp = require('gulp');

var jshint = require('gulp-jshint'),
    path = require('path'),
    buffer = require('vinyl-buffer');
  	sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
  	concat = require('gulp-concat'),
  	uglify = require('gulp-uglify'),
  	rename = require('gulp-rename'),
  	nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    folders = require('gulp-folders'),
    srcFolder = './components/pages/',
    destFolder = './public/js/',
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify'),
    polyify    = require('polyify').configure;

var babelify = require("babelify");

gulp.task('build-reacts', function(){

    return browserify('./components/pages/index/index.jsx')
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(destFolder));
});


gulp.task('build-reacts-production', function(){

    return browserify('./components/pages/index/index.jsx')
        .transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(destFolder))
        .pipe(rename('index.min.js'))
        .pipe(buffer())
				.pipe(uglify())
        .pipe(gulp.dest(destFolder));
});

// Compile Our Production Sass
gulp.task('build-styles-production', function() {
  return gulp.src('./public/scss/*.scss')
          .pipe(sass({
            style: 'compact'
          }))
          .pipe(autoprefixer())
          .pipe(rename('main.min.css'))
          .pipe(minifyCSS({keepBreaks:false}))
          .pipe(gulp.dest('./public/css'))

});

// Compile Our for Development
gulp.task('build-styles', function() {

  return gulp.src('./public/scss/*.scss')
          .pipe(sourcemaps.init())
            .pipe(sass({
              errLogToConsole: true,
              style: 'expanded'
            }))
          .pipe(sourcemaps.write())
          .pipe(autoprefixer())
          .pipe(gulp.dest('./public/css'));
});

// gulp.task('lint', function() {
//     return gulp.src('js/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });


gulp.task('server', function () {
  nodemon({ script: 'app.js', ext: 'html', ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
})



// Watch Files For Changes
gulp.task('watch', function() {
    // livereload.listen();
    gulp.watch('components/pages/**/*.jsx', ['build-reacts']);
    gulp.watch('public/scss/**/*.scss', ['build-styles']);
});

// Default Task
gulp.task('default', ['build-styles', 'build-reacts', 'server', 'watch' ]);
gulp.task('build', ['build-styles-production', 'build-styles', 'build-reacts', 'build-reacts-production' ]);
