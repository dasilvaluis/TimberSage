<?php

namespace luisms\TimberSage\PostType;

use luisms\TimberSage\Taxonomy;

class Registrator {

  	private static $singleton;

	protected function __construct() {}

	protected function __clones() {}

	private function register_post_types() {

		$custom_post_types = [
			new Example( [ Taxonomy\Example::TAX_SLUG ] ),
		];
		foreach ( $custom_post_types as $custom_post_type ) {
			$custom_post_type->register();
		}
	}

	public static function init() {
		return self::instance();
	}

	public static function instance() {
		if ( empty(self::$singleton) ) {
			self::$singleton = new self;
			self::$singleton->register_post_types();
		}
		return self::$singleton;
  	}
}
