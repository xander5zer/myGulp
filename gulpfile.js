/* eslint-disable semi */
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    jade        = require('gulp-pug');

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(clean({force: true}))
});

gulp.task('jade', function () {
  return gulp.src('app/template/**/*.pug')
    .pipe(jade())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(clean({force: true}))
});

gulp.task('watch', function () {
  gulp.watch('app/sass/**/*.sass', gulp.series('sass'))
  gulp.watch('app/template/**/*.jade', gulp.series('jade'))
});

gulp.task('default', gulp.series(
  gulp.parallel('sass', 'jade'),
  gulp.parallel('browser-sync', 'watch')
));