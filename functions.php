<?php

/**
 * WordPress functions
 */

// Define enviroment as production if WP_ENV is not set
if ( !defined('WP_ENV') || ('development' !== WP_ENV && 'staging' !== WP_ENV) ) {
  define( 'WP_ENV', 'production' );
}

//* Require composer depedencies
if ( file_exists( get_stylesheet_directory() . '/vendor/autoload.php' ) ) {
	require_once get_stylesheet_directory() . '/vendor/autoload.php';
}

use TimberSage;
new Timber\Timber();

/**
 * Includes
 *
 * The $includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 *
 * @link https://github.com/roots/sage/pull/1042
 */
$includes = [];

$includes[] = 'lib/variables.php';  // Variables
$includes[] = 'lib/assets.php';     // Scripts and stylesheets
$includes[] = 'lib/extras.php';     // Custom functions
$includes[] = 'lib/setup.php';      // Theme setup
$includes[] = 'lib/wrapper.php';    // Theme wrapper class

// Post types registrator
$includes[] = 'lib/custom-post-types/cpt-registrator.php';

// Helpers
$includes[] = 'lib/helpers/debug.php';

// Hooks
$includes[] = 'lib/hooks/uploads.php';

foreach ($includes as $file) {
  if (!$filepath = locate_template($file)) {
    trigger_error(sprintf(__('Error locating %s for inclusion'), $file), E_USER_ERROR);
  }

  require_once $filepath;
}
unset($file, $filepath);
