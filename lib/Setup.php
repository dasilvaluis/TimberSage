<?php

namespace luisms\TimberSage;

class Setup {

	/**
	 * Theme setup
	 */
	public static function run() {

		// Make theme available for translation
		// Community translations can be found at https://github.com/roots/sage-translations
		load_theme_textdomain( 'timbersage', get_template_directory() . '/languages' );

		// Enable plugins to manage the document title
		// http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
		add_theme_support( 'title-tag' );

		// Register wp_nav_menu() menus
		// http://codex.wordpress.org/Function_Reference/register_nav_menus
		register_nav_menus(
			[
				'primary_navigation' => __( 'Primary Navigation' ),
			]
		);

		// Enable Custom background
		// https://codex.wordpress.org/Custom_Backgrounds
		add_theme_support( 'custom-background' );

		// Enable post thumbnails
		// http://codex.wordpress.org/Post_Thumbnails
		// http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
		// http://codex.wordpress.org/Function_Reference/add_image_size
		add_theme_support( 'post-thumbnails' );

		// Enable post formats
		// http://codex.wordpress.org/Post_Formats
    	add_theme_support('post-formats', [ 'aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio' ] );

		// Enable HTML5 markup support
		// http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
		add_theme_support( 'html5', [ 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form' ] );

		// Use main stylesheet for visual editor
		// To add custom styles edit /assets/styles/layouts/_tinymce.scss
		add_editor_style( Assets::asset_path( 'styles/main.css' ) );

		// Set upload size limit to 32 megabytes
		// https://developer.wordpress.org/reference/hooks/upload_size_limit/
		add_filter(
			'upload_size_limit',
			function( $bytes ) {
				return 33554432;
			}
		);

		// Add variables to Twig context array
		add_filter(
			'timber_context',
			function( $context ) {
				$context['vars'] = [
					'images' => __IMAGES__,
				];
				return $context;
			}
		);
	}
}
