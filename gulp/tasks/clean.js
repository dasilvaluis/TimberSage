const gulp = require('gulp');
const del = require('del');
const config = require('../config.json');

// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', () => {
  del.bind(null, [config.paths.dist], { force: true });
});
