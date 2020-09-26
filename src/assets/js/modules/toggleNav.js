
/* toggleNav */
$(document).ready(function() {
    const $toggleButton = $('#navToggle');
    const $navBar = $('#header');

    $toggleButton.on('click', function(event) {
        event.preventDefault();
        $navBar.toggleClass('active');
    })

    $(document).on('click', function(event) {
        if ( !$(event.target).closest('#header').length ) {
            $navBar.removeClass('active');
        }
    })
})