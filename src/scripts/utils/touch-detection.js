// Touch Device Detection
// you can use the class no-touch on the body to prevent 
// some behavior on mobile. Ex.: hover
var touchEvent = 'touchend';
var isTouchDevice = 'ontouchstart' in document.documentElement;
if ( !isTouchDevice ) {
  $('body').addClass('no-touch');
  $('body').removeClass('touch');
  touchEvent = 'click';
} else {
  $('body').removeClass('no-touch');
  $('body').addClass('touch');
  touchEvent = 'touchend';
}

// Prevent clicks on touch devices
// add to html elements that you need to prevent the flickring
$('.js-prevent-click').click(function (e) {
  if ( isTouchDevice ) {
    e.preventDefault();
  }
});