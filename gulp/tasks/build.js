import gulp from 'gulp';
import runSequence from 'run-sequence';

// ### Build
// `gulp build` - Run all the build tasks but don't clean up beforehand.
// Generally you should be running `gulp` instead of `gulp build`.
gulp.task('build', (callback) => {
  runSequence('styles', 'scripts', ['fonts', 'images'], callback);
});
