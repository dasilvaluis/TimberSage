// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', function() {
  browserSync.init({
    files: config.watch,
    proxy: config.devUrl,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    },
    open: false
  });
  gulp.watch([paths.source + 'styles/**/*'], ['styles']);
  gulp.watch([paths.source + 'scripts/**/*'], ['scripts']);
  gulp.watch([paths.source + 'fonts/**/*'], ['fonts']);
  gulp.watch([paths.source + 'images/**/*'], ['images']);
  gulp.watch(['assets/config.json'], ['build']);
});
