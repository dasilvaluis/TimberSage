<?php

/**
 * Single
 */

$post_type = get_post_type();
$context = Timber::get_context();
$context['post'] = new TimberPost();
Timber::render(['views/single-' . $post_type . '.twig', 'views/single.twig'], $context);