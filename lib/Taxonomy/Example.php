<?php

namespace luisms\TimberSage\Taxonomy;

class Example extends Taxonomy {

	/**
	 * Taxonomy Slug
	 */
	const TAX_SLUG = 'custom_category';

	/**
	 * Taxonomy Archive Slug
	 */
	const TAX_ARCHIVE = 'custom-category';

	public function register() {

		if ( taxonomy_exists( static::TAX_SLUG ) ) {
			throw new \Exception( "Taxonomy `{static::TAX_SLUG}` already exists." );
		}

		register_taxonomy( static::TAX_SLUG, $this->post_types, $this->get_args() );
	}

	public function get_args() {
		return [
			'hierarchical'  => true,   /* if this is true, it acts like categories, if not, like tags */
			'labels'        => [
				'name'              => __( 'Custom Categories' ),         /* name of the custom taxonomy */
				'singular_name'     => __( 'Custom Category' ),           /* single taxonomy name */
				'search_items'      => __( 'Search Custom Categories' ),  /* search title for taxomony */
				'all_items'         => __( 'All Custom Categories' ),     /* all title for taxonomies */
				'parent_item'       => __( 'Parent Custom Category' ),    /* parent title for taxonomy */
				'parent_item_colon' => __( 'Parent Custom Category:' ),   /* parent taxonomy title */
				'edit_item'         => __( 'Edit Custom Category' ),      /* edit custom taxonomy title */
				'update_item'       => __( 'Update Custom Category' ),    /* update title for taxonomy */
				'add_new_item'      => __( 'Add New Custom Category' ),   /* add new title for taxonomy */
				'new_item_name'     => __( 'New Custom Category Name' )   /* name title for taxonomy */
			],
			'show_admin_column' => true,
			'show_ui'           => true,
			'query_var'         => true,
			'rewrite'           => [ 'slug' => static::TAX_ARCHIVE ],
		];
	}
}
