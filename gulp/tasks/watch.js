const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('../config.json');

// ### Watch
// `gulp watch` - Use BrowserSync to proxy your dev server and synchronize code
// changes across devices. Specify the hostname of your dev server at
// `manifest.config.devUrl`. When a modification is made to an asset, run the
// build step for that asset and inject the changes into the page.
// See: http://www.browsersync.io
gulp.task('watch', ['build'], () => {
  browserSync.init({
    files: config.watch,
    proxy: config.devUrl,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**', 'vendor/**'],
    },
    open: false,
    notify: false,
  });

  gulp.watch([`${config.paths.source}/styles/**/*`], ['styles']);
  gulp.watch([`${config.paths.source}/scripts/**/*`], ['scripts']);
  gulp.watch([`${config.paths.source}/fonts/**/*`], ['fonts']);
  gulp.watch([`${config.paths.source}/images/**/*`], ['images']);
});
