<article <?php post_class(); ?>>
  <div class="entry-content">
    <?php the_content(); ?>
  </div>
  <footer>
    <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', THEME_DOMAIN), 'after' => '</p></nav>']); ?>
  </footer>
  <?php comments_template('/templates/comments.php'); ?>
</article>