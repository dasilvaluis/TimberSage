<?php 
$context = Timber::get_context();
$context['page'] = new TimberPost();
Timber::render('views/page.twig', $context);