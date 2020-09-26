
/* toggleSearch */
$(document).ready(function() {
    const $headerSearchForm = $('#headerSearch');
    const $headerSearchIcon = $('#headerSearchIcon');

    $headerSearchIcon.on('click', function() {
        $headerSearchForm.toggleClass('active');
    })

    $(document).keyup(function(event) {

        if ( $headerSearchForm.hasClass('active') && event.keyCode === 13 ) {   // key "Enter"
            $headerSearchForm.submit();
        } else if ( $headerSearchForm.hasClass('active') && event.keyCode === 27 ) {  // key "Escape"
            $headerSearchForm.removeClass('active');
        }
    })

    $(document).on('click', function(event) {
        if ( !$(event.target).closest('#headerSearch' ).length) {
            $headerSearchForm.removeClass('active');
        }
    })
})

