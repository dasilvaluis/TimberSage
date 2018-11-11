<?php

namespace luisms\TimberSage\Taxonomy;

use luisms\TimberSage\PostType;

class Registrator {

  	private static $singleton;

	protected function __construct() {}

	protected function __clones() {}

	private function register_taxonomies() {

		$taxonomies = [
			new Example( [ PostType\Example::CPT_SLUG ]  ),
		];
		foreach ( $taxonomies as $taxonomy ) {
			$taxonomy->register();
		}
	}

	public static function init() {
		if ( empty(self::$singleton) ) {
			self::$singleton = new self;
			self::$singleton->register_taxonomies();
		}
		return self::$singleton;
	}
}
