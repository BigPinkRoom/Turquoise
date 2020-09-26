
/* fixedHeader */
$(document).ready(function() {

    const $header = $('#header');
    const $intro = $('#intro');

    checkScroll();

    $(window).on('scroll', function() {
        checkScroll();
    })

    function checkScroll() {
        if ( $(window).scrollTop() >= $intro.outerHeight() + $intro.offset().top ) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
    }
})