<?php

namespace luisms\TimberSage\PostType;

class Example extends PostType {

	const CPT_SLUG = 'custom_type';
	const CPT_ARCHIVE = 'custom-type';

  	public function register() {

		if ( post_type_exists( static::CPT_SLUG ) ) {
			throw new \Exception( "Post Type `{static::CPT_SLUG}` already exists." );
		}

		register_post_type( static::CPT_SLUG, $this->get_args() );
	}

	public function get_args() {

		$labels = [
			'name'                => __( 'Custom Type' ),                     /* This is the Title of the Group */
			'singular_name'       => __( 'Custom Type' ),                     /* This is the individual type */
			'all_items'           => __( 'All Custom Types' ),                /* the all items menu item */
			'add_new'             => __( 'Add New' ),                         /* The add new menu item */
			'add_new_item'        => __( 'Add New Custom Type' ),             /* Add New Display Title */
			'edit'                => __( 'Edit' ),                            /* Edit Dialog */
			'edit_item'           => __( 'Edit Custom Types' ),               /* Edit Display Title */
			'new_item'            => __( 'New Custom Type' ),                 /* New Display Title */
			'view_item'           => __( 'View Custom Type' ),                /* View Display Title */
			'search_items'        => __( 'Search Custom Type' ),              /* Search Custom Type Title */
			'not_found'           => __( 'Nothing found in the Database.' ),  /* This displays if there are no entries yet */
			'not_found_in_trash'  => __( 'Nothing found in Trash' ),          /* This displays if there is nothing in the trash */
			'parent_item_colon'   => ''
		];

		$capabilities = [];

		$supports = [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky' ];

		$config = [
			'description'         => __( 'This is the example custom type' ),
			'labels'              => $labels,
			'supports'            => $supports,
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'show_in_rest'        => true,
			'menu_position'       => 5,
			'can_export'          => true,
			'has_archive'         => static::CPT_ARCHIVE,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'post',
			'capabilities'        => $capabilities,
			'taxonomies'          => $this->taxonomies,
			'rewrite'             => [ 'slug' => static::CPT_ARCHIVE ],
		];

		return $config;
	}
}
