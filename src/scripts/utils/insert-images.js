//Generic function to read wich size of image to show
// how to use: 
// add the class js-data-image to your element that needs background
// add the atributes data-img-big and data-img-small with respactive url
function insertImages() {

    $('.js-data-image').each( function() {
      var $el = $(this);
      if ( window.innerWidth > Bkp.small ) {
        $el.css('background-image', ' url('+ $el.attr('data-img-big') +')');
      } else {
        $el.css('background-image', ' url('+ $el.attr('data-img-small') +')');
      }
    });
  }
  
  $(window).on('resize', function() {
    insertImages();
  });