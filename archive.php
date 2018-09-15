<?php

/**
 * Archive Page
 */

$post_type = get_post_type();
$context = Timber::get_context();
$context['posts'] = new \Timber\PostQuery();
Timber::render(['views/archive-' . $post_type . '.twig', 'views/archive.twig'], $context);