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
    srcFolder = './components',
    destFolder = './js/',
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify');

gulp.task('build-reacts', folders(srcFolder, function(folder){

    return browserify('./components/' + folder + '/index.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source(folder+'.js'))
        .pipe(gulp.dest('js/'));
}));


gulp.task('build-reacts-production', folders(srcFolder, function(folder){

    return browserify('./components/' + folder + '/index.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source(folder+'.js'))
        .pipe(gulp.dest('js/'))
        .pipe(streamify(uglify()))
        .pipe(rename(folder+'.min.js'))
        .pipe(gulp.dest(destFolder));
}));

// Compile Our Production Sass
gulp.task('build-styles-production', function() {
  return gulp.src('./scss/*.scss')
          .pipe(sass({
            style: 'compact'
          }))
          .pipe(autoprefixer())
          .pipe(rename('main.min.css'))
          .pipe(minifyCSS({keepBreaks:false}))
          .pipe(gulp.dest('./css'))

});

// Compile Our for Development
gulp.task('build-styles', function() {

  return gulp.src('./scss/*.scss')
          .pipe(sourcemaps.init())
            .pipe(sass({
              errLogToConsole: true,
              style: 'expanded'
            }))
          .pipe(sourcemaps.write())
          .pipe(autoprefixer())
          .pipe(gulp.dest('./css'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    // livereload.listen();
    gulp.watch('components/**/*.jsx', ['build-reacts']);
    gulp.watch('scss/**/*.scss', ['build-styles']);
});

// Default Task
gulp.task('default', ['build-styles', 'build-reacts', 'watch' ]);
gulp.task('build', ['build-styles-production', 'build-styles', 'build-reacts', 'build-reacts-production' ]);