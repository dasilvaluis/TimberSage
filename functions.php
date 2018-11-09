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

new Timber\Timber();

/**
 * Includes
 *
 * The $includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 *
 * Please note that missing files will produce a fatal error.
 */
$includes = [];
$includes[] = 'lib/variables.php';  // Variables
$includes[] = 'lib/helpers/debug.php'; // Helpers

foreach ($includes as $file) {
	$filepath = locate_template($file);
	if ( ! $filepath ) {
		trigger_error(sprintf(__('Error locating %s for inclusion'), $file), E_USER_ERROR);
	}
	require_once $filepath;
}
unset($file, $filepath);

// * Register post types
add_action( 'init', [ '\\luisms\\TimberSage\\PostType\\Registrator', 'init' ] );
// * Register taxonomies
add_action( 'init', [ '\\luisms\\TimberSage\\Taxonomy\\Registrator', 'init' ] );
// * Base template
add_filter( 'template_include', [ '\\luisms\\TimberSage\\Wrapper', 'wrap' ], 109 );
// * Enqueue Scripts
add_action( 'wp_enqueue_scripts', [ '\\luisms\\TimberSage\\Assets', 'enqueue' ], 100 );
// * Setup Theme
add_action( 'after_setup_theme', [ '\\luisms\\TimberSage\\Setup', 'run' ] );
