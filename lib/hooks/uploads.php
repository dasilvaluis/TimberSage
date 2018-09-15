<?php

/**
 * Hooks - Uploads
 */

/* ==========================================================================
   CHANGE UPLOAD LIMIT by TimberSage
   ========================================================================== */

add_filter( 'upload_size_limit', 'timbersage_increase_upload' );
function timbersage_increase_upload( $bytes ) {
    return 33554432; // 32 megabytes
}