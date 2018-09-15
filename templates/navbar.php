<?php
/**
 * Navbar
 */

$context = Timber::get_context();

$context['navbar'] = wp_nav_menu(
	[
		'theme_location' => 'primary_navigation',
		'menu_class'     => 'site-navbar',
		'echo'           => false,
	]
);
$context['logo'] = get_option( 'theme_options' )['theme_logo'];
$context['mobile_logo'] = get_option( 'theme_options' )['theme_mobile_logo'];

Timber::render( 'views/navbar.twig', $context );
