<?php

namespace TimberSage;

class Assets {

	/**
	 * Get URIs for assets
	 *
	 * @param string $file_path File path relative to assets folder
	 * @return string Asset fIle uri
	 */
	public static function asset_path( $file_path ) {
		$dist_path = get_template_directory_uri() . '/dist/';
		return $dist_path . $file_path;
	}

	/**
	 * Get modified time of assets
	 *
	 * @param string $file_path File path relative to assets folder
	 * @return int timestamp
	 */
	public static function asset_mtime( $file_path ) {
		$dist_path = get_template_directory() . '/dist/';
		return file_exists( $dist_path . $file_path ) ? filemtime( $dist_path . $file_path ) : 0;
	}

	/**
	 * Enqueue theme assets
	 *
	 * @return void
	 */
	public static function enqueue() {

		// * Styles
		wp_enqueue_style( 'timbersage/css', self::asset_path( 'styles/main.css' ), false, self::asset_mtime( 'styles/main.css' ) );

		// * Scripts
		wp_deregister_script( 'jquery' );
		wp_enqueue_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), null, true );
		wp_enqueue_script( 'timbersage/js', self::asset_path( 'scripts/main.js' ), array( 'jquery', 'swiper/js' ), self::asset_mtime( 'scripts/main.js' ), true );
		wp_localize_script( 'timbersage/js', 'vars', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
	}
}

