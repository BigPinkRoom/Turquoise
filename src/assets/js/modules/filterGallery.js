
/* filterGallery */
$(document).ready(function() {
    let button = '#works .works__button';
    let image = '#works img[data-category]';    

    $('#works .works__button').on('click', function(event) {
        let $category = $(this).text().toLocaleLowerCase();

        if($category === "all" || $category === "view all") {
            $(image).parent().parent().show();
            return
        }

        $(image).parent().parent().show();
        $(image).not(`#works img[data-category="${$category}"]`).parent().parent().hide();
    })
})