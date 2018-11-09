<?php

namespace luisms\TimberSage\PostType;

use luisms\TimberSage\Taxonomy;

abstract class PostType {

	/**
	 * Taxonomies Array
	 */
	protected $taxonomies;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $taxonomies   The taxonomies list.
	 */
	public function __construct( $taxonomies = [] ) {
		$this->taxonomies = $taxonomies;
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
