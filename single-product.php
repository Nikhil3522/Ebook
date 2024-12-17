<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/single-product.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:46:23 GMT -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>EBook</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicons -->
    <link rel="shortcut icon" href="images/logo/logo.png">
    <link rel="apple-touch-icon" href="images/logo/logo.png">

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

<body>
<!--[if lte IE 9]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade
    your browser</a> to improve your experience and security.</p>
<![endif]-->

<!-- Main wrapper -->
<div class="wrapper" id="wrapper">

    <?php 
    include('navbar.php');
    include('cons.php');
    ?>
    <!-- Start Search Popup -->
    <div class="box-search-content search_active block-bg close__top">
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
    <!-- Start breadcrumb area -->
    
    <!-- End breadcrumb area -->
    <?php
        $book_id = $_GET['book_id'];
        // SELECT *  FROM ebook  LEFT JOIN favourite  ON ebook.id = favourite.book_id WHERE ebook.id = 38
        $query = "SELECT * FROM ebook WHERE id = $book_id LIMIT 1";
        $result = $conn->query($query);
        $result = $result->fetch_assoc();
        $title = $result['title'];
        $description = $result['description'];
        $thumbnail1 = $result['thumbnail1'];
        $thumbnail2 = $result['thumbnail2'];
        $cat_id = $result['cat_id'];
        $lang = $result['lang'];
        $total_page = $result['total_page'];

    ?>
    <!-- Start main Content -->
    <div class="maincontent bg--white pb--55 mt--80">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="wn__single__product">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <div class="wn__fotorama__wrapper">
                                    <div class="fotorama wn__fotorama__action" data-nav="thumbs" style="display: flex; justify-content: center; background: #e8e8e8; padding: 20px 0px;">
                                        <a href="1.html"><img src="https://roshan1.b-cdn.net/<?php echo $thumbnail1; ?>" alt=""></a>
                                        <a href="2.html"><img src="https://roshan1.b-cdn.net/<?php echo $thumbnail2; ?>" alt=""></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <div class="product__info__main">
                                    <h1><?php echo $title; ?></h1>
                                    <div class="product-reviews-summary d-flex">
                                        <ul class="rating-summary d-flex">
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                        </ul>
                                    </div>
                                    <div class="product__overview">
                                        <p><?php echo $description; ?></p>
                                    </div>
                                    <div class="box-tocart d-flex">
                                        <div class="addtocart__actions">
                                            <button class="tocart" onclick="window.location.href='book_reader/examples/dark_skin.html?id=<?php echo $book_id; ?>&language=<?= $lang; ?>&total_page=<?php echo $total_page; ?>'" type="submit" title="Read this book">
                                                Read Now
                                            </button>
                                        </div>
                                        <?php
                                            $query = "SELECT * FROM favourite WHERE user_id = 1 AND book_id = $book_id LIMIT 1";
                                            $already_added = $conn->query($query);
                                            if($already_added->num_rows === 0){
                                        ?>
                                        <div class="product-addto-links clearfix">
                                            <a class="wishlist" onclick="addFavourite(event, <?php echo $book_id; ?>); window.location.reload(true);"></a>
                                            <!-- <a class="compare" href="#"></a> -->
                                        </div>
                                        <?php } ?>
                                    </div>
                                    <div class="product-share">
                                        <ul>
                                            <li class="categories-title">Share :</li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-twitter icons"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-tumblr icons"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-facebook icons"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-social-linkedin icons"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product__info__detailed">
                        <div class="pro_details_nav nav justify-content-start" role="tablist">
                            <!-- <a class="nav-item nav-link " data-bs-toggle="tab" href="#nav-details" role="tab">Details</a> -->
                            <a class="nav-item nav-link active" data-bs-toggle="tab" href="#nav-review" role="tab">Your Review</a>
                        </div>
                        <div class="tab__container tab-content">
                            <!-- Start Single Tab Content -->
                            <div class="pro__tab_label tab-pane fade show active" id="nav-review" role="tabpanel">
                                <div class="review-fieldset">
                                    <div class="review-field-ratings">
                                        <div class="product-review-table">
                                            <div class="review-field-rating d-flex">
                                                <span>Rate</span>
                                                <ul class="rating d-flex">
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review_form_field">
                                        <div class="input__box">
                                            <span>Review</span>
                                            <textarea name="review" style="padding: 5px;"></textarea>
                                        </div>
                                        <div class="review-form-actions">
                                            <button>Submit Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Single Tab Content -->
                        </div>
                    </div>
                    <div class="wn__related__product pt--80 pb--50">
                        <div class="section__title text-center">
                            <h2 class="title__be--2">Similar Books</h2>
                        </div>
                        <div class="row mt--60">
                            <div class="productcategory__slide--2 arrows_style owl-carousel owl-theme">
                                <!-- Start Single Product -->
                                <?php
                                    $query = "SELECT * FROM ebook WHERE active = 1 ORDER BY RAND() LIMIT 6";
                                    $result = $conn->query($query);
                                    while($row = $result->fetch_assoc()){
                                        $title = $row['title'];
                                        $thumbnail1 = $row['thumbnail1'];
                                        $thumbnail2 = $row['thumbnail2'];

                                ?>
                                <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div class="product__thumb" style="backegroud: red; padding: 5px;">
                                        <a class="first__img" href="single-product.php">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbnail1; ?>" alt="<?php echo $title; ?> image">
                                        </a>
                                        <a class="second__img animation1" href="single-product.php">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbnail2; ?>" alt="<?php echo $title; ?> image">
                                        </a>
                                    </div>
                                    <div class="product__content content--center">
                                        <h4><a href="single-product.php"><?php echo $title; ?></a></h4>
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
                                <?php } ?>
                                <!-- End Single Product -->
                            </div>
                        </div>
                    </div>
                    <div class="wn__related__product">
                        <div class="section__title text-center">
                            <h2 class="title__be--2">NEW ARRIVALS</h2>
                        </div>
                        <div class="row mt--60">
                            <div class="productcategory__slide--2 arrows_style owl-carousel owl-theme">
                                <!-- Start Single Product -->
                                <?php
                                    $query = "SELECT * FROM ebook WHERE active = 1 ORDER BY RAND() LIMIT 6";
                                    $result = $conn->query($query);
                                    while($row = $result->fetch_assoc()){
                                        $title = $row['title'];
                                        $thumbnail1 = $row['thumbnail1'];
                                        $thumbnail2 = $row['thumbnail2'];

                                ?>
                                <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div class="product__thumb">
                                        <a class="first__img" href="single-product.php">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbnail1; ?>" alt="product image">
                                        </a>
                                        <a class="second__img animation1" href="single-product.php">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbnail2; ?>" alt="product image">
                                        </a>
                                    </div>
                                    <div class="product__content content--center">
                                        <h4><a href="single-product.php"><?php echo $title; ?></a></h4>
                                        <div class="product__hover--content">
                                            <ul class="rating d-flex mt-[-35px]">
                                                <li class="on"><i class="fa fa-star-o"></i></li>
                                                <li class="on"><i class="fa fa-star-o"></i></li>
                                                <li class="on"><i class="fa fa-star-o"></i></li>
                                                <li><i class="fa fa-star-o"></i></li>
                                                <li><i class="fa fa-star-o"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?>
                                <!-- End Single Product -->
                            </div>
                        </div>
                    </div>
                </div>
                <?php include('side_book_category.php') ?>
            </div>
        </div>
    </div>
    <!-- End main Content -->
    <!-- Start Search Popup -->
    <div class="box-search-content search_active block-bg close__top">
        <form id="search_mini_form--2" class="minisearch" action="#">
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
    <?php include('footer.php'); ?>
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
                            </div><!-- .product-info -->
                        </div><!-- .modal-product -->
                    </div><!-- .modal-body -->
                </div><!-- .modal-content -->
            </div><!-- .modal-dialog -->
        </div>
        <!-- END Modal -->
    </div>
    <!-- END QUICKVIEW PRODUCT -->

</div>
<!-- //Main wrapper -->


<!-- JS Files -->
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/single-product.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:46:25 GMT -->
</html>