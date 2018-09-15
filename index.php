<?php

$context = Timber::get_context();
$context['posts'] = new \Timber\PostQuery();
Timber::render('views/archive.twig', $context);
