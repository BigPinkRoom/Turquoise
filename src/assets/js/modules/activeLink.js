
/* activeLink */
$(document).ready(function() {
    checkLink();

    $(window).on('scroll', function() {
        checkLink();
    })

    function onElement(idElement, attrubuteLink, position) {
        let $idElement = $(`#${idElement}`);
        let $elementStartPosition = $idElement.offset().top;
        let $elementEndPosition = $idElement.offset().top + $idElement.outerHeight();
        let $elementLink = $(`a[${attrubuteLink}="${idElement}"]`);
        
        if( position >= $elementStartPosition && $(window).scrollTop() < $elementEndPosition ) {
            return [$elementLink, true]
        } else {
            return [$elementLink, false]
        }
    }

    function checkLink() {
        let $position = $(window).scrollTop();

        let elements = {
            $home: onElement('intro', 'data-scroll', $position),
            $about: onElement('about', 'data-scroll', $position),
            $services: onElement('services', 'data-scroll', $position),
            $works: onElement('works', 'data-scroll', $position),
            $blog: onElement('blog', 'data-scroll', $position),
            $contact: onElement('contact', 'data-scroll', $position),    
        };

        for (let key in elements) {
            if(elements[key][1]) {
                $(elements[key][0]).addClass('active');
            } else {
                $(elements[key][0]).removeClass('active');
            }
        }
    }
})