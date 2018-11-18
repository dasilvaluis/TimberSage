var gulp = require('gulp');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

// CLI options
global.enabled = {
  // Disable source maps when `--prod`
  maps: !argv.prod,
  // Fail styles task on error when `--prod`
  failStyleTask: argv.prod,
  // Fail due to ESLint warnings only when `--prod`
  failESLint: argv.prod,
  // Strip debug statments from javascript when `--prod`
  stripJSDebug: argv.prod,
  // Minify CSS and JS when `--prod`
  minify: argv.prod,
};

require('require-dir')('./gulp/tasks');

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
