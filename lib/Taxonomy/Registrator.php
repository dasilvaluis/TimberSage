<?php

namespace luisms\TimberSage\Taxonomy;

class Registrator {

  	private static $singleton;

	private function __construct() {
		$this->register_taxonomies();
	}

	private function register_taxonomies() {
		Example::register();
	}

  	public static function init() {
		if ( empty(self::$singleton) ) {
			self::$singleton = new self;
		}
		return self::$singleton;
  	}
}
