<?php

$context = Timber::get_context();
$context['menu'] = wp_nav_menu([
  'theme_location' => 'primary_navigation', 
  'menu_class' => 'nav',
  'walker' => new Clean_Walker(),
  'echo' => false
]);
Timber::render('views/navbar.twig', $context);