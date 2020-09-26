
/* smoothScroll */
$(document).ready(function() {
    const $attribute = 'data-scroll';

    $(document).on('click', function(event) {

        let $attributeData = $(event.target).attr($attribute);

        if ( $attributeData ) {
            event.preventDefault();
            
            let $id = '#' + $attributeData;

            $('body, html').animate({
                scrollTop: $($id).offset().top,
            }, 1000)
        }
    })
})