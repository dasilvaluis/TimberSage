<?php

namespace TimberSage\Extras;

use TimberSage\Setup;

/**
 * Add <body> classes
 */
function body_class( $classes ) {
	// Add page slug if it doesn't exist
	if ( is_single() || is_page() && ! is_front_page() ) {
		if ( ! in_array( basename( get_permalink() ), $classes ) ) {
			$classes[] = basename( get_permalink() );
		}
	}

	return $classes;
}
add_filter( 'body_class', __NAMESPACE__ . '\\body_class' );

/**
 * Function to add a mobile logo to theme.
 *
 * @param mixed $wp_customize customize object.
 */
function customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'theme_logo', array(
			'title'       => __( 'Logo', 'timbersage-backoffice' ),
			'description' => '',
			'priority'    => 30,
		)
	);
	$wp_customize->add_section(
		'theme_mobile_logo', array(
			'title'       => __( 'Mobile Logo', 'timbersage-backoffice' ),
			'description' => '',
			'priority'    => 30,
		)
	);

	$wp_customize->add_setting(
		'theme_options[theme_logo]', array(
			'capability' => 'edit_theme_options',
			'type'       => 'option',
		)
	);
	$wp_customize->add_setting(
		'theme_options[theme_mobile_logo]', array(
			'capability' => 'edit_theme_options',
			'type'       => 'option',
		)
	);

	$wp_customize->add_control(
		new \WP_Customize_Image_Control(
			$wp_customize, 'theme_logo', array(
				'label'    => __( 'Logo Upload', 'timbersage-backoffice' ),
				'section'  => 'theme_logo',
				'settings' => 'theme_options[theme_logo]',
			)
		)
	);
	$wp_customize->add_control(
		new \WP_Customize_Image_Control(
			$wp_customize, 'theme_mobile_logo', array(
				'label'    => __( 'Mobile Logo Upload', 'timbersage-backoffice' ),
				'section'  => 'theme_mobile_logo',
				'settings' => 'theme_options[theme_mobile_logo]',
			)
		)
	);
}
add_action( 'customize_register', __NAMESPACE__ . '\\customize_register' );
