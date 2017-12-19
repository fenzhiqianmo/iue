var gulp = require('gulp');
gulp.task('default', ['copy1','copy2','copy3','copy4']);
gulp.task('copy1',  function() {
  return gulp.src('../iue/index.js')
    .pipe(gulp.dest('../node_modules/iue'))
}).task('copy2',  function() {
  return gulp.src('../iue/lib/*')
    .pipe(gulp.dest('../node_modules/iue/lib'))
}).task('copy3',  function() {
  return gulp.src('../build/package.json')
    .pipe(gulp.dest('../node_modules/iue'))
}).task('copy4',  function() {
  return gulp.src('../build/README.md')
    .pipe(gulp.dest('../node_modules/iue'))
});