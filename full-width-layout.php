<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/full-width-layout.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:46:23 GMT -->
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
    <!-- Start Shop Page -->
    <section class="page-shop-sidebar left--sidebar bg--white mt--40" style="min-height: 100vh;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                                <div class="shop__list nav justify-content-center" role="tablist">
                                    <a class="nav-item nav-link active" data-bs-toggle="tab" href="#nav-grid" role="tab">
                                        <i class="fa fa-th"></i>
                                    </a>
                                    <a class="nav-item nav-link" data-bs-toggle="tab" href="#nav-list" role="tab">
                                        <i class="fa fa-list"></i>
                                    </a>
                                </div>
                                <div class="orderby__wrapper">
                                    <span>Sort By</span>
                                    <select class="shot__byselect">
                                        <option disabled>Select</option>
                                        <option>Recommended</option>
                                        <option>What's New</option>
                                        <option>Popularity</option>
                                        <option>Readers Rating</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab__container tab-content">
                        <div class="shop-grid tab-pane fade show active" id="nav-grid" role="tabpanel">
                            <div class="row">
                                <?php
                                    $query = "SELECT * FROM ebook JOIN favourite ON favourite.book_id = ebook.id  WHERE ebook.active = 1";
                                    $result = $conn->query($query);
                                    if($result->num_rows > 0){
                                    while($row = $result->fetch_assoc()){
                                        $id = $row['book_id'];
                                        $title = $row['title'];
                                        $thumbanil1 = $row['thumbnail1'];
                                        $thumbanil2 = $row['thumbnail2'];
                                        $link = "single-product.php?book_id=$id";
                                ?>
                                <!-- Start Single Product -->
                                <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                    <div class="product__thumb">
                                        <a class="first__img" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil1; ?>" alt="product image">
                                        </a>
                                        <a class="second__img animation1" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil2; ?>" alt="product image">
                                        </a>
                                    </div>
                                    <div class="product__content content--center">
                                        <h4><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h4>
                                        <div class="action">
                                            <div class="actions_inner">
                                                <ul class="add_to_links">
                                                    <li><a class="compare" onclick="removeFavourite('<?php echo $id; ?>')" title="Remove this book"><i class="fa-solid fa-x"></i></a></li>
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
                                <!-- End Single Product -->
                                <?php }}else{
                                    echo "<h5 style='text-align: center;'>You have not added any book yet.</h5>";
                                } ?>
                            </div>
                        </div>
                        <div class="shop-grid tab-pane fade" id="nav-list" role="tabpanel">
                            <div class="list__view__wrapper">
                            <?php
                                    $query = "SELECT * FROM ebook JOIN favourite ON favourite.book_id = ebook.id WHERE ebook.active = 1";
                                    $result = $conn->query($query);
                                    while($row = $result->fetch_assoc()){
                                        $id = $row['book_id'];
                                        $title = $row['title'];
                                        $thumbanil1 = $row['thumbnail1'];
                                        $thumbanil2 = $row['thumbnail2'];
                                        $desciption = $row['description'];
                                        $link = "single-product.php?book_id=$id";
                                        $lang = $row['lang'];
                                        $total_page = $row['total_page'];
                                ?>
                                <!-- Start Single Product -->
                                <div class="list__view mt-3">
                                    <div class="thumb">
                                        <a class="first__img" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil1; ?>" alt="product images">
                                        </a>
                                        <a class="second__img animation1" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil2; ?>" alt="product images">
                                        </a>
                                    </div>
                                    <div class="content">
                                        <h2><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h2>
                                        <ul class="rating d-flex">
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                        </ul>
                                        <p><?php echo $desciption ?></p>
                                        <ul class="cart__action d-flex">
                                            <li class="cart"><a href="book_reader/examples/dark_skin.html?id=<?= $id ?>&language=<?= $lang ?>&total_page=<?= $total_page; ?>">Read Now</a></li>
                                            <!-- <li class="wishlist"><a href="cart.html"></a></li> -->
                                            <li>
                                                <a class="compare" onclick="removeFavourite('<?php echo $id; ?>')" title="Remove this book" style="padding-top: 10px; cursor: pointer;">
                                                    <i class="bi bi-cross" style="margin: 11px"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- End Single Product -->
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Shop Page -->
    <?php include('footer.php'); ?>
    <!-- QUICKVIEW PRODUCT -->
    <div id="quickview-wrapper">
        <!-- Modal -->
        <div class="modal fade" id="productmodal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal__container" role="document">
                <div class="modal-content">
                    <div class="modal-header modal__header">
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"
                        </button>
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
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/full-width-layout.php by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:46:23 GMT -->
</html>