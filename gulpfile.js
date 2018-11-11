var gulp = require('gulp');

require('require-dir')('./gulp/tasks');

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
