<?php

namespace TimberSage\PostType;

class Registrator {

  	private static $singleton;

	protected function __construct() {}

	protected function __clones() {}

	private function register_post_types() {
		Example::register();
	}

	public static function init() {
		$instance = self::instance();
		$instance->register_post_types();
	}

	public static function instance() {
		if ( empty(self::$singleton) ) {
			self::$singleton = new self;
		}
		return self::$singleton;
  	}
}
