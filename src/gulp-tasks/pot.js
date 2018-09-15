var wpPot     = require('gulp-wp-pot');
var replace   = require('gulp-replace');
var rename    = require('gulp-rename');

gulp.task('pot', function(callback) {
  runSequence('compile-twigs', 'generate-pot', callback);
});

/**
 * Generate POT file from all .php files in the theme,
 * including cache folder.
 */
gulp.task('generate-pot', function () {
  return gulp.src(config.pot.php_files)
    .pipe(wpPot( {
      domain: config.pot.text_domain
    } ))
    .pipe(gulp.dest(config.pot.destFolder + '/' + config.pot.text_domain + '.pot'))
    .pipe(gulpif(!config.pot.keepCache, del.bind(null, [config.pot.cacheFolder], {force: true})));
});

/**
 * Fake Twig Gettext Compiler
 * 
 * Searches and replaces all occurences of __('string', 'domain') or _e('string', 'domain') 
 * with <?php __('string', 'domain') ?> or <?php _e('string', 'domain') ?> and sends the content
 * to a .php file with the same name to the cache folder.
 * 
 */
gulp.task('compile-twigs', function(){
  del.bind(null, [config.pot.cacheFolder], {force: true})
  
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
   * [\'\"]     -> Match ' or "
   * .+?        -> Match any character, 1 to infinite times, as few times as possible (ungreedy)
   * ,          -> Match ,
   * .+?        -> Match any character, 1 to infinite times, as few times as possible (ungreedy)
   * \)         -> Match )
   */
  var gettext_regex = {

    // _e( "text", "domain" )
    // __( "text", "domain" )
    // translate( "text", "domain" )
    // esc_attr__( "text", "domain" )
    // esc_attr_e( "text", "domain" )
    // esc_html__( "text", "domain" )
    // esc_html_e( "text", "domain" )
    simple : /(__|_e|translate|esc_attr__|esc_attr_e|esc_html__|esc_html_e)\(\s*?[\'\"].+?[\'\"]\s*?,\s*?[\'\"].+?[\'\"]\s*?\)/g,

    // _n( "single", "plural", number, "domain" )
    plural : /_n\(\s*?[\'\"].*?[\'\"]\s*?,\s*?[\'\"].*?[\'\"]\s*?,\s*?.+?\s*?,\s*?[\'\"].+?[\'\"]\s*?\)/g,

    // _x( "text", "context", "domain" )
    // _ex( "text", "context", "domain" )
    // esc_attr_x( "text", "context", "domain" )
    // esc_html_x( "text", "context", "domain" )
    // _nx( "single", "plural", "number", "context", "domain" )
    disambiguation : /(_x|_ex|_nx|esc_attr_x|esc_html_x)\(\s*?[\'\"].+?[\'\"]\s*?,\s*?[\'\"].+?[\'\"]\s*?,\s*?[\'\"].+?[\'\"]\s*?\)/g,

    // _n_noop( "singular", "plural", "domain" )
    // _nx_noop( "singular", "plural", "context", "domain" )
    noop : /(_n_noop|_nx_noop)\((\s*?[\'\"].+?[\'\"]\s*?),(\s*?[\'\"]\w+?[\'\"]\s*?,){0,1}\s*?[\'\"].+?[\'\"]\s*?\)/g
  };

  gulp.src(config.pot.twig_files)
    .pipe(replace(gettext_regex.simple, function( match ){
      return '<?php ' + match + '; ?>';
    }))
    .pipe(replace(gettext_regex.plural, function( match ){
      return '<?php ' + match + '; ?>';
    }))
    .pipe(replace(gettext_regex.disambiguation, function( match ){
      return '<?php ' + match + '; ?>';
    }))
    .pipe(replace(gettext_regex.noop, function( match ){
      return '<?php ' + match + '; ?>';
    }))
    .pipe(rename(function( file_path ) {
      file_path.extname = ".php"
    }))
    .pipe(gulp.dest(config.pot.cacheFolder));
    
});
