const gulp = require('gulp');

gulp.task("safe-ux", () => {
  gulp.src([
    './node_modules/safe_ux_guidelines/assets/**/*',
  ])
  .pipe(gulp.dest('./src/assets'));

  gulp.src([
    './node_modules/safe_ux_guidelines/scss/**/*',
  ])
  .pipe(gulp.dest('./src/scss'));

  gulp.src([
    './src/app.scss' ,
  ])
  .pipe(gulp.dest('./src/scss'));
});
