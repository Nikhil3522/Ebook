let offset = 0;

function createItemHtml_grid(item) {
    // var link = `single-product.php?book_id=${item.id}`;
    var link = `#`;
    return `
        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="product__thumb">
                <a class="first__img" href="${link}">
                    <img src="${item.thumbnail}" alt="product image">
                </a>
            </div>
            <div class="product__content content--center">
                <h4><a href="${link}">${item.title}</a></h4>
            </div>
        </div>
    `;
}

function loadPodcast(){
    // $('#loading').show();
    handleLoading(true);

    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: { 
            offset: offset,
            function_name: 'load_podcast',
            category_id : null
        },
        success: function (data) {

            const items = JSON.parse(data);

            if(items.length === 0){
                $(window).off('scroll');
                $('#load_more_button').hide();
                return;
            }else{
                $('#load_more_button').show();
            }
            
            let container = $('#ebook_row_container');
            let itemHtml = createItemHtml_grid;

            items.forEach((item) => {
                container.append(itemHtml(item));
            })

            offset += 9;

            if(items.length < 9){
                $('#load_more_button').hide();
            }else{
                $('#load_more_button').show();
            }
        },
        complete: function () {
            $('#loading').hide();
            loading = false;
            handleLoading(false);
        }
    });
}

loadPodcast();
$('#load_more_button').on('click', loadPodcast);