<?php

/* ==========================================================================
Debug Function
==========================================================================
Use it for printing variables and objects to the page for debug
========================================================================== */

if( !function_exists('pr') ) :
  function pr($object){
    echo '<pre class="debug">';
      if( $object == false )
        var_dump($object);
      else
        print_r($object);
    echo '</pre>';
  }
endif;
