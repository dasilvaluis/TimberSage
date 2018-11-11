const gulp = require('gulp');
const runSequence = require('run-sequence');

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', (callback) => {
  runSequence('styles', 'scripts', ['fonts', 'images'], callback);
});
