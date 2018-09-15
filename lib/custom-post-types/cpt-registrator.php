<?php

require_once __DIR__ . '/example.php';

class Post_Type_Registrator {

  private static $singleton;

  private function __construct() {
    $this->register_post_types();
  }
  
  private function register_post_types() {
    // Example::register();
  }

  public static function init() {
		if ( empty(self::$singleton) ) {
			self::$singleton = new self;
		}
		return self::$singleton;
  }
}

// Register all post types in one function
add_action( 'init', ['Post_Type_Registrator', 'init']);
