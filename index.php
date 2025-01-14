<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:22 GMT -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Roshan Elibrary</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicons -->
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="shortcut icon" href="images/favicon.ico">

    <!-- Google font (font-family: 'Roboto', sans-serif; Poppins ; Satisfy) -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,600i,700,700i,800"
          rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/plugins.css">
    <link rel="stylesheet" href="css/style.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <!-- Cusom css -->
    <link rel="stylesheet" href="css/custom.css">

    <!-- Modernizer js -->
    <script src="js/vendor/modernizr-3.5.0.min.js"></script>
</head>
<style>
    #loader{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    #wrapper{
        display: none;
    }

    /* .owl-item{
        width: 150px;
    } */

    #new-arrival-container{
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;
    }

    #new-arrival-container > div {
        width: 23%;
    }

    #all-time-fav-container{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
        padding: 20px;
    }

    #all-time-fav-container > div{
        /* width: 12%; */
        box-shadow: 1px 1px 5px #92000069;
    }

    #all-time-fav-container > div:hover{
        /* width: 12%; */
        box-shadow: 1px 1px 15px #92000069;
    }

    @media only screen and (max-width: 600px) {
        #new-arrival-container > div {
            width: 45%;
        }

        #all-time-fav-container > div{
            width: 47%;
        }
    }
</style>

<body>
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade
    your browser</a> to improve your experience and security.</p>
<![endif]-->

<div id="loader">
    <img src="images/loader7.gif" />
</div>
<!-- Main wrapper -->
<div class="wrapper d-md-block" id="wrapper">
    <!-- Header -->
    <?php 
        include('navbar.php');
        include('cons.php');
    ?>
    <!-- //Header -->
    <!-- Start Search Popup -->
    <div class="brown--color box-search-content search_active block-bg close__top">
        <form id="search_mini_form" class="minisearch" action="#">
            <div class="field__search">
                <input type="text" placeholder="Search entire store here...">
                <div class="action">
                    <a href="#"><i class="zmdi zmdi-search"></i></a>
                </div>
            </div>
        </form>
        <div class="close__wrap">
            <span>close</span>
        </div>
    </div>
    <!-- End Search Popup -->
    <!-- Start Slider area -->
    <div id="slider" class="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
        <!-- Start Single Slide -->
        <?php
            $query = "SELECT * FROM banners WHERE active = 1";
            $banners_result = $conn->query($query);
            while($banner_row = $banners_result->fetch_assoc()){
                $banner_url = $banner_row['banner_url'];
                ?>
                <div class="slide  fullscreen align__center--left" style="max-height: 200px;">
                    <img src="<?= $banner_url; ?>" style="position: absolute; top: 0;"/>
                </div>
                <?php
            }

        ?>
        <!-- End Single Slide -->
    </div>
    <!-- End Slider area -->
     <!-- Start Best Seller Area -->
    <section class="wn__bestseller__area bg--white pt--80  pb--30">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section__title text-center">
                        <h2 class="title__be--2">Books for <span class="color--theme">Every Mood</span></h2>
                        <p>Find stories that match every occasion, suit every mood, and cater to every kind of reader, whether you’re seeking adventure, romance, mystery, or a heartfelt escape into another world!</p>
                    </div>
                </div>
            </div>
            <div class="row mt--50">
                <div class="col-md-12 col-lg-12 col-sm-12">
                    <div class="product__nav nav justify-content-center" id="all-category-container" role="tablist" style="row-gap: 15px;">
                        <a class="nav-item nav-link" id="all-category-btn" onclick="window.location.reload()">ALL</a>
                        <?php
                            $query = "SELECT A.*, 
                                            (SELECT B.id 
                                            FROM ebook AS B 
                                            WHERE FIND_IN_SET(A.id, B.cat_id) AND B.active = 1
                                            ORDER BY B.id ASC 
                                            LIMIT 1) AS book_id
                                    FROM categories AS A;";
                                    
                            $all_categories = $conn->query($query);

                            if ($all_categories->num_rows > 0) {
                                while ($category = $all_categories->fetch_assoc()) {
                                    $category_id = $category['id'];
                                    $category_name = $category['category'];
                                    $book_id = $category['book_id'];
                                    
                                    ?>
                                    <a class="nav-item nav-link" id="home_category_id-<?= $category_id ?>" 
                                    <?= ($book_id !== NULL) ? 'onclick="loadCategoryBook(' . $category_id . ')"' : ''; ?>>
                                    <?= htmlspecialchars($category_name) ?>
                                    </a>
                                    <?php
                                }
                            }
                        ?>

                    </div>
                </div>
            </div>
            <div class="tab__container tab-content mt--60">
                <!-- Start Single Tab Content -->
                <div class=" single__tab tab-pane fade show active" id="nav-all" role="tabpanel">
                    <!-- <div class="product__indicator--4 arrows_style owl-carousel owl-theme"></div> -->
                    <div  id="ebook_row_container"></div>
                </div>
                <!-- End Single Tab Content -->
                <!-- End Single Tab Content -->
            </div>
            <div class="d-flex mt-3">
                <button class="plan-btn" id="home-explore-more-btn" onclick="window.location.href='category.php'"><?= $lang_data['Explore_more']; ?></button>
            </div>
        </div>

    </section>
    <!-- Start BEst Seller Area -->
     <!-- Start BEst Seller Area -->
    <section class="wn__product__area brown--color pt--80  pb--30" style="background: #f6f6f6;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section__title text-center">
                        <h2 class="title__be--2">New <span class="color--theme">Arrivals</span></h2>
                        <p>Discover the freshest titles hot off the press, explore groundbreaking stories, and embark on thrilling adventures that will keep you turning pages for hours!</p>
                    </div>
                </div>
            </div>
            <!-- Start Single Tab Content -->
            <div id="new-arrival-container">
                
                <?php 
                    $query = "SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE ebook.active = 1 ORDER BY id DESC LIMIT 4";
                    $result = $conn->query($query);
                    while($row = $result->fetch_assoc()){
                        $row_id = $row['id'];
                        $title = $row['title'];
                        $thumbnail1 = $row['thumbnail1'];
                        $thumbnail2 = $row['thumbnail2'];
                        $link = "single-product.php?book_id=$row_id";
                        $book_id = $row['book_id'];
                        ?>
                        <div class="product product__style--3" id="itemId-<?= $row_id ?>">
                            <div class="product__thumb">
                                <a class="first__img" href="<?= $link ?>">
                                    <img src="https://roshan1.b-cdn.net/<?= $thumbnail1 ?>" alt="product image">
                                </a>
                                <a class="second__img animation1" href="<?= $link ?>">
                                    <img src="https://roshan1.b-cdn.net/<?= $thumbnail2 ?>" alt="product image">
                                </a>
                            </div>
                            <div class="product__content content--center">
                                <h4><a href="<?= $link ?>"><?= $title ?></a></h4>
                                <?php if(!$book_id){?>
                                    <div class="action">
                                        <div class="actions_inner">
                                            <ul class="add_to_links">
                                                <li>
                                                    <a class="compare" onclick="addFavourite(event, <?= $row_id ?>)" title="Add to My books"><i class="fa-solid fa-heart"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                        <?php
                    }
                ?>
                
            </div>
            <!-- End Single Tab Content -->
        </div>
    </section>
    <!-- Start BEst Seller Area -->
    <!-- Start NEwsletter Area -->
    <?php if($_SESSION["sign_up"] != 1){ ?>
    <section class="wn__newsletter__area bg-image--2">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
                    <div class="section__title text-center">
                        <h2><?= $lang_data['Unlock_Endless_Stories'] ?></h2>
                    </div>
                    <div class="newsletter__block text-center">
                        <p>Subscribe now for unlimited access to books across all genres. Read anytime, anywhere. Start your journey today!</p>
                        <div style="display: flex; justify-content: space-between;">
                            <form method="post" action="register.php" style="display: flex; margin: auto;">
                                <p style="line-height: 60px; width: 45px; padding: 0;">+93</p>
                                <div class="newsletter__box">
                                    <input type="number" name="msisdn" oninput="limitLength(this)" placeholder="Enter your Mobile number">
                                    <button><?= $lang_data['Subscribe']; ?></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php } ?>
    <!-- End NEwsletter Area -->
    <!-- Best Sale Area -->
    <section class="best-seel-area pt--80 pb--60" style="background: #f6f6f6;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section__title text-center pb--50">
                        <h2 class="title__be--2">All-Time <span class="color--theme">Favorites</span></h2>
                        <p>Explore timeless classics and the latest trending titles, handpicked for every reader.</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="all-time-fav-container">

            <?php
                $query = "SELECT ebook.*, favourite.book_id FROM ebook LEFT JOIN favourite ON ebook.id = favourite.book_id  AND favourite.user_id = $user_id WHERE ebook.active = 1 ORDER BY RAND() LIMIT 6";
                $result = $conn->query($query);
                while($row = $result->fetch_assoc()){
                    $row_id = $row['id'];
                    $thumbnail1 = $row['thumbnail1'];
                    $link = "single-product.php?book_id=$row_id";
            ?>
                <!-- Single product start -->
                <div class="product product__style--3">
                    <div class="product__thumb">
                        <a class="first__img" href="<?= $link ?>">
                            <img src="https://roshan1.b-cdn.net/<?= $thumbnail1; ?>" alt="product image" height="250px">
                        </a>
                    </div>
                    <div class="product__content content--center">
                        <div class="action">
                            <div class="actions_inner">
                                <ul class="add_to_links">
                                    <li><a class="compare" href="<?= $link ?>"><i class="fa-solid fa-heart"></i></a></li>
                                </ul>
                            </div>
                        </div>
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
                <!-- Single product end -->
            <?php } ?>
        </div>
    </section>
    <!-- Best Sale Area Area -->
    <?php include('footer.php') ?>
    <!-- QUICKVIEW PRODUCT -->
    <div id="quickview-wrapper">
        <!-- Modal -->
        <div class="modal fade" id="productmodal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal__container" role="document">
                <div class="modal-content">
                    <div class="modal-header modal__header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-product">
                            <!-- Start product images -->
                            <div class="product-images">
                                <div class="main-image images">
                                    <img alt="big images" src="images/product/big-img/1.jpg">
                                </div>
                            </div>
                            <!-- end product images -->
                            <div class="product-info">
                                <h1>Simple Fabric Bags</h1>
                                <div class="rating__and__review">
                                    <ul class="rating">
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                        <li><span class="ti-star"></span></li>
                                    </ul>
                                    <div class="review">
                                        <a href="#">4 customer reviews</a>
                                    </div>
                                </div>
                                <div class="price-box-3">
                                    <div class="s-price-box">
                                        <span class="new-price">$17.20</span>
                                        <span class="old-price">$45.00</span>
                                    </div>
                                </div>
                                <div class="quick-desc">
                                    Designed for simplicity and made from high quality materials. Its sleek geometry
                                    and material combinations creates a modern look.
                                </div>
                                <div class="select__color">
                                    <h2>Select color</h2>
                                    <ul class="color__list">
                                        <li class="red"><a title="Red" href="#">Red</a></li>
                                        <li class="gold"><a title="Gold" href="#">Gold</a></li>
                                        <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                        <li class="orange"><a title="Orange" href="#">Orange</a></li>
                                    </ul>
                                </div>
                                <div class="select__size">
                                    <h2>Select size</h2>
                                    <ul class="color__list">
                                        <li class="l__size"><a title="L" href="#">L</a></li>
                                        <li class="m__size"><a title="M" href="#">M</a></li>
                                        <li class="s__size"><a title="S" href="#">S</a></li>
                                        <li class="xl__size"><a title="XL" href="#">XL</a></li>
                                        <li class="xxl__size"><a title="XXL" href="#">XXL</a></li>
                                    </ul>
                                </div>
                                <div class="social-sharing">
                                    <div class="widget widget_socialsharing_widget">
                                        <h3 class="widget-title-modal">Share this product</h3>
                                        <ul class="social__net social__net--2 d-flex justify-content-start">
                                            <li class="facebook"><a href="#" class="rss social-icon"><i
                                                    class="zmdi zmdi-rss"></i></a></li>
                                            <li class="linkedin"><a href="#" class="linkedin social-icon"><i
                                                    class="zmdi zmdi-linkedin"></i></a></li>
                                            <li class="pinterest"><a href="#" class="pinterest social-icon"><i
                                                    class="zmdi zmdi-pinterest"></i></a></li>
                                            <li class="tumblr"><a href="#" class="tumblr social-icon"><i
                                                    class="zmdi zmdi-tumblr"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="addtocart-btn">
                                    <a href="#">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END QUICKVIEW PRODUCT -->
</div>
<!-- //Main wrapper -->

<!-- JS Files -->
<script>
    const userId = <?php echo json_encode($user_id); ?>;
</script>
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>
<script src="js/script.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('wrapper').style.display = 'block';
        $('#load_more_button').show();
    })
</script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:57 GMT -->
</html>