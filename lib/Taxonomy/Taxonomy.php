<?php

namespace luisms\TimberSage\Taxonomy;

abstract class Taxonomy {

	/**
	 * Post Types Array
	 */
	protected $post_types;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $post_types   Post Types array.
	 */
	public function __construct( $post_types = array() ) {
		$this->post_types = $post_types;
	}

	/**
	 * Taxonomy registration
	 */
	abstract function register();

	/**
	 * Taxonomy Args
	 */
	abstract function get_args();
}
