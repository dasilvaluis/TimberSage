<?php

use TimberSage\Setup;
use TimberSage\Wrapper; ?>

<!doctype html>
<html <?php language_attributes(); ?>>
  <?php get_template_part('templates/head'); ?>
  <body <?php body_class(); ?>>
    <!--[if IE]>
      <div class="alert alert-warning">
        <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'timbersage'); ?>
      </div>
    <![endif]-->
    <?php
    get_template_part('templates/navbar'); ?>
    <div class="uk-container uk-container-center" role="document">
      <div class="content">
        <main class="main">
          <?php include Wrapper\template_path(); ?>
        </main><!-- /.main -->
      </div><!-- /.content -->
    </div><!-- /.uk-container -->
    <?php
    get_template_part('templates/footer');
    wp_footer(); ?>
  </body>
</html>
