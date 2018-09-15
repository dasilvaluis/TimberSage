// ### Clean
// `gulp clean` - Deletes the build folder entirely.
gulp.task('clean', del.bind(null, [paths.dist], {force: true}));
