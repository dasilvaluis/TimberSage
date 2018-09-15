// ### Deploy
// `gulp zip` - Zip the whole project.
var zip = require('gulp-zip');

gulp.task('zip', function() {
  gulp.src(config.zip.files, {base: '../../'})
      .pipe(zip(config.zip.name))
      .pipe(gulp.dest(config.zip.dest))
  }
);

gulp.task('generate-zip', ['clean'], function(callback) {
  runSequence('build', 'zip', callback);
});
