const gulp = require('gulp');
const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const config = require('../config.json');

// ### Deploy
// `gulp zip` - Zip the whole project.
gulp.task('zip', () => {
  gulp.src(config.zip.files, { base: '../' })
    .pipe(zip(config.zip.name))
    .pipe(gulp.dest(config.zip.dest));
});

gulp.task('generate-zip', (callback) => {
  runSequence('clean', 'build', 'zip', callback);
});
