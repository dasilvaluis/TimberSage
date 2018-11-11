const gulp = require('gulp');
const runSequence = require('run-sequence');
const wpPot = require('gulp-wp-pot');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const del = require('del');
const gulpif = require('gulp-if');
const config = require('../config.json');

/**
 * __
 * _e
 * _x
 * _xn
 * _ex
 * _n_noop
 * _nx_noop
 * translate  -> Match __,  _e, _x and so on
 * \(         -> Match (
 * \s*?       -> Match empty space 0 or infinite times, as few times as possible (ungreedy)
 * ['"]     -> Match ' or "
 * .+?        -> Match any character, 1 to infinite times, as few times as possible (ungreedy)
 * ,          -> Match ,
 * .+?        -> Match any character, 1 to infinite times, as few times as possible (ungreedy)
 * \)         -> Match )
 */
const gettextRegex = {

  // _e( "text", "domain" )
  // __( "text", "domain" )
  // translate( "text", "domain" )
  // esc_attr__( "text", "domain" )
  // esc_attr_e( "text", "domain" )
  // esc_html__( "text", "domain" )
  // esc_html_e( "text", "domain" )
  simple: /(__|_e|translate|esc_attr__|esc_attr_e|esc_html__|esc_html_e)\(\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _n( "single", "plural", number, "domain" )
  plural: /_n\(\s*?['"].*?['"]\s*?,\s*?['"].*?['"]\s*?,\s*?.+?\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _x( "text", "context", "domain" )
  // _ex( "text", "context", "domain" )
  // esc_attr_x( "text", "context", "domain" )
  // esc_html_x( "text", "context", "domain" )
  // _nx( "single", "plural", "number", "context", "domain" )
  disambiguation: /(_x|_ex|_nx|esc_attr_x|esc_html_x)\(\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?,\s*?['"].+?['"]\s*?\)/g,

  // _n_noop( "singular", "plural", "domain" )
  // _nx_noop( "singular", "plural", "context", "domain" )
  noop: /(_n_noop|_nx_noop)\((\s*?['"].+?['"]\s*?),(\s*?['"]\w+?['"]\s*?,){0,1}\s*?['"].+?['"]\s*?\)/g,
};

gulp.task('pot', (callback) => {
  runSequence('compile-twigs', 'generate-pot', callback);
});

/**
 * Generate POT file from all .php files in the theme,
 * including cache folder.
 */
gulp.task('generate-pot', () => {
  const output = gulp.src(config.pot.php_files)
    .pipe(wpPot({
      domain: config.pot.text_domain,
    }))
    .pipe(gulp.dest(`${config.pot.destFolder}/${config.pot.text_domain}.pot`))
    .pipe(gulpif(!config.pot.keepCache, del.bind(null, [config.pot.cacheFolder], { force: true })));
  return output;
});

/**
 * Fake Twig Gettext Compiler
 *
 * Searches and replaces all occurences of __('string', 'domain') or _e('string', 'domain')
 * with <?php __('string', 'domain') ?> or <?php _e('string', 'domain') ?> and sends the content
 * to a .php file with the same name to the cache folder.
 *
 */
gulp.task('compile-twigs', () => {
  del.bind(null, [config.pot.cacheFolder], { force: true });
  gulp.src(config.pot.twig_files)
    .pipe(replace(gettextRegex.simple, match => `<?php ${match}; ?>`))
    .pipe(replace(gettextRegex.plural, match => `<?php ${match}; ?>`))
    .pipe(replace(gettextRegex.disambiguation, match => `<?php ${match}; ?>`))
    .pipe(replace(gettextRegex.noop, match => `<?php ${match}; ?>`))
    .pipe(rename({
      extname: '.php',
    }))
    .pipe(gulp.dest(config.pot.cacheFolder));
});
