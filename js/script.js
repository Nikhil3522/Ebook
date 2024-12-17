function createItemHtml_grid(item) {
    var link = `single-product.php?book_id=${item.id}`;
    return `
        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12" id="itemId-${item.id}">
            <div class="product__thumb">
                <a class="first__img" href="${link}">
                    <img src="https://roshan1.b-cdn.net/${item.thumbnail1}" alt="product image">
                </a>
                <a class="second__img animation1" href="${link}">
                    <img src="https://roshan1.b-cdn.net/${item.thumbnail2}" alt="product image">
                </a>
            </div>
            <div class="product__content content--center">
                <h4><a href="${link}">${item.title}</a></h4>
                ${ !item.book_id ? `
                <div class="action">
                    <div class="actions_inner">
                        <ul class="add_to_links">
                            <li>
                                <a class="compare" onclick="addFavourite(event, ${item.id})" title="Add to My books">
                                    <i class="fa-solid fa-heart"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>` : ``}
                <div class="product__hover--content">
                    <ul class="rating d-flex">
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li><i class="fa fa-star-o"></i></li>
                        <li><i class="fa fa-star-o"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function createItemHTML_list(item){
    var link = `single-product.php?book_id=${item.id}`;
    var bookReadLink = `book_reader/examples/dark_skin.html?id=${item.id}&language=${item.lang}&total_page=${item.total_page}`;
    return `<div class="list__view mt-4" id="itemId-${item.id}">
                <div class="thumb">
                    <a class="first__img" href="${link}">
                        <img src="https://roshan1.b-cdn.net/${item.thumbnail1}" alt="${item.title} images">
                    </a>
                    <a class="second__img animation1" href="${link}">
                        <img src="https://roshan1.b-cdn.net/${item.thumbnail2}" alt="${item.title} images">
                    </a>
                </div>
                <div class="content">
                    <h2><a href="${link}">${item.title}</a></h2>
                    <ul class="rating d-flex">
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li class="on"><i class="fa fa-star-o"></i></li>
                        <li><i class="fa fa-star-o"></i></li>
                        <li><i class="fa fa-star-o"></i></li>
                    </ul>
                    <p style="text-align: justify;">${item.description}</p>
                    <ul class="cart__action d-flex">
                        <li class="cart"><a href="${bookReadLink}">Read Now</a></li>
                        ${ !item.book_id ? `<li class="wishlist"><a onclick="addFavourite(event, ${item.id})"></a></li>` : `` }
                    </ul>
                </div>
            </div>`;
}

$('#load_more_button').hide();
const url = window.location.href;
// Create a URLSearchParams object
const params = new URLSearchParams(new URL(url).search);
// Get the value of 'category_id'
const categoryId = params.get('category_id');


let offset = 0;
let loading = false;
var language = "All";

function loadMoreData(category_id_parm = null) {

    if (loading) return;
    loading = true;
    $('#loading').show();
    handleLoading(true);

    let category_id = categoryId;

    if(typeof(category_id_parm) === "number"){
        category_id = category_id_parm;
    }

    $.ajax({
        url: 'api.php',
        method: 'GET',
        data: { 
            offset: offset,
            function_name: 'load_ebook',
            category_id : category_id,
            language: language
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

            const activeTab = $('.nav-link.active');

            var container;
            var itemHtml;
            if (activeTab.attr('href') === "#nav-list") {
                container = $('#ebook_row_container_list');
                itemHtml = createItemHTML_list;
            }else if (activeTab.attr('href') === "#nav-grid"){
                container = $('#ebook_row_container');
                itemHtml = createItemHtml_grid;
            }else{
                container = $('#ebook_row_container');
                itemHtml = createItemHtml_grid;
                if(items.length > 8){
                    items.pop();
                }
            }

            if(typeof(category_id_parm) === "number"){
                $('#ebook_row_container').html("");
            }
            

            items.forEach((item) => {
                const itemElement = $(itemHtml(item)); // Create the item element
                container.append(itemElement); // Append the item to the container
            
                // Animate the item with slideDown after it is appended
                itemElement.hide().slideDown(500); // Initially hide the element, then slide it down over 500ms
            });

            if(typeof(category_id_parm) !== "number"){
                offset += 9;
            }

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

function changeLayout(){
    offset = 0;
    $('#load_more_button').hide();
    loadMoreData();
}

// Load initial data
loadMoreData();

// // Infinite scroll
// $(window).on('scroll', function () {
//     if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
//         loadMoreData();
//     }
// });

$('#load_more_button').on('click', loadMoreData);


var homeCategoryId = null;

function loadCategoryBook(category_id = null){
    $('#all-category-btn').css('color', 'black');
    offset = 0;
    if(homeCategoryId){
        homeCategoryId.css('color', 'black');
    }

    $('#home-explore-more-btn').click(function() {
        window.location.href = `category.php?category_id=${category_id}`;
    });     

    homeCategoryId = $(`#home_category_id-${category_id}`);
    homeCategoryId.css('color', 'red');

    $('#ebook_row_container').html("");
    // Loading
    $('#ebook_row_container').html(`<div id="ebook_row_container" style="min-height: 400px;display: flex;justify-content: center;align-content: center; min-width: 100%;">
            <img src="./images/content-loader.gif">
        </div>`);
    // end loading
    if(!category_id){
        loadMoreData();
    }else{
        loadMoreData(category_id);
    }
}
