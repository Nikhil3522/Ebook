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
    <section class="page-shop-sidebar left--sidebar bg--white mt--40">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <?php
                        $search_input = $_GET['search_key'];
                        $author_input = $_GET['author'];
                        $category_input = $_GET['category_input'];

                        if(isset($category_input)  && $category_input != NULL){
                            $query = "SELECT * FROM ebook WHERE title LIKE '%$search_input%' AND FIND_IN_SET($category_input ,cat_id) AND ACTIVE = 1 LIMIT 12";
                        }else{
                            $query = "SELECT * FROM ebook WHERE title LIKE '%$search_input%' AND ACTIVE = 1 LIMIT 12";
                        }
                        $result = $conn->query($query);

                        if($result->num_rows > 0){
                            $search_message = "Search result for: <span style='font-weight: bold;'>$search_input</span>";
                        }else{
                            $search_message = "No results found for your query. You can refine your search or check out our recommended content below.";
                        }
                    ?>
                    <div class="filter filter--hidden">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <form>
                                        <div style="display: flex; justify-content: space-evenly; flex-wrap: wrap; margin-bottom: 20px;">
                                            <div class="form-input" style="display: flex;margin-bottom: 20px;border: 1px solid #c6c6c6;justify-content: space-between;padding: 0px 5px;">
                                                <input 
                                                    type="text"
                                                    placeholder="Book Title"
                                                    name="search_key"
                                                    style="height: 30px;border: navajowhite;width: 100%;"
                                                    value="<?= $search_input ?>"
                                                >
                                                <button style="border: none;background: none;">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                            
                                            <div class="form-input" style="display: flex;margin-bottom: 20px;border: 1px solid #c6c6c6;justify-content: space-between;padding: 0px 5px;">
                                                <input 
                                                    type="text"
                                                    placeholder="Book Author"
                                                    name="author"
                                                    style="height: 30px;border: navajowhite;width: 100%;"
                                                    value="<?= $author_input ?>"
                                                >
                                                <button style="border: none;background: none;">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                            <select class="filter__select" name="category_input" id="filter__genre" data-id="ss-90rtiw3i" tabindex="-1" aria-hidden="true" style="height: 36px; width: 216px; border-color: darkgray;">
                                                <option disabled selected>Category</option>
                                                <?php
                                                $query = "SELECT * FROM categories";
                                                           
                                                $category_result = $conn->query($query);
                                                while($row = $category_result->fetch_assoc()){
                                                    $category_id = $row['id'];
                                                    $category = $row['category'];
                                                    ?>
                                                        <option value="<?= $category_id; ?>"><?= $category; ?></option>
                                                    <?php
                                                }
                                                ?>
                                            </select>
                                            <div class="subscribe-btn-wrap d-flex mb-3">
                                                <button class="subscribe-btn" href="register.php" type="submit" id="load_more_button">
                                                    <p>Search</p>
                                                </button>
                                            </div>

                                            <!-- <div class="subscribe-btn-wrap d-flex mb-3">
                                                <button class="m-auto" type="submit" id="load_more_button">
                                                    <span id="load_more_text">Search</span>
                                                </button>
                                            </div> -->
                                        </div>
                                        <p class="mobile-hide text-center" style=" font-size: 14px; line-height: 40px; margin-left: 10px;"><?= $search_message; ?></p>

                                       </form>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <select class="shot__byselect" onchange="shuffleDivs('sort-parentDiv')">
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
                            <div class="row" id="sort-parentDiv">
                                <?php
                                    if($result->num_rows > 0 && isset($search_input)){
                                        while($row = $result->fetch_assoc()){
                                            $id = $row['id'];
                                            $title = $row['title'];
                                            $thumbanil1 = $row['thumbnail1'];
                                            $thumbanil2 = $row['thumbnail2'];
                                            $link = "single-product.php?book_id=$id";
                                            ?>
                                        <!-- Start Single Product -->
                                        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div class="product__thumb">
                                                <a class="first__img" href="<?php echo $link; ?>">
                                                    <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil1; ?>" alt="<?php echo $title; ?> image">
                                                </a>
                                                <a class="second__img animation1" href="<?php echo $link; ?>">
                                                    <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil2; ?>" alt="<?php echo $title; ?> image">
                                                </a>
                                            </div>
                                            <div class="product__content content--center">
                                                <h4><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h4>
                                                <div class="action">
                                                    <div class="actions_inner">
                                                        <ul class="add_to_links">
                                                        
                                                            <li><a class="compare" onclick="addFavourite(event, <?php echo $id; ?>)" title="Add to My books"><i class="fa-solid fa-heart"></i></a></li>
                                                            </li>
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
                                            <?php 
                                    }
                                    }else{
                                        $result2 = $conn->query("SELECT * FROM ebook WHERE active = 1 ORDER BY RAND() LIMIT 12");
                                        while($row = $result2->fetch_assoc()){
                                            
                                            $id = $row['id'];
                                            $title = $row['title'];
                                            $thumbanil1 = $row['thumbnail1'];
                                            $thumbanil2 = $row['thumbnail2'];
                                            $link = "single-product.php?book_id=$id";
                                            ?>
                                            <!-- Start Single Product -->
                                            <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
                                                <div class="product__thumb">
                                                    <a class="first__img" href="<?php echo $link; ?>">
                                                        <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil1; ?>" alt="<?php echo $title; ?> image">
                                                    </a>
                                                    <a class="second__img animation1" href="<?php echo $link; ?>">
                                                        <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil2; ?>" alt="<?php echo $title; ?> image">
                                                    </a>
                                                </div>
                                                <div class="product__content content--center">
                                                    <h4><a href="<?php echo $link; ?>"><?php echo $title; ?></a></h4>
                                                    <div class="action">
                                                        <div class="actions_inner">
                                                            <ul class="add_to_links">
                                                            
                                                                <li><a class="compare" onclick="addFavourite(event, <?php echo $id; ?>)" title="Add to My books"><i class="fa-solid fa-heart"></i></a></li>
                                                                </li>
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
                                        <?php 
                                        }   
                                    }
                                 ?>
                            </div>
                        </div>
                        <div class="shop-grid tab-pane fade" id="nav-list" role="tabpanel">
                            <div class="list__view__wrapper">
                                <?php
                                    $result->data_seek(0);
                                    while($row = $result->fetch_assoc()){
                                        $id = $row['id'];
                                        $title = $row['title'];
                                        $thumbanil1 = $row['thumbnail1'];
                                        $thumbanil2 = $row['thumbnail2'];
                                        $description = $row['description'];
                                        $link = "single-product.php?book_id=$id";
                                        $total_page = $row['total_page'];
                                ?>
                                <!-- Start Single Product -->
                                <div class="list__view">
                                    <div class="thumb">
                                        <a class="first__img" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil1; ?>" alt="product images">
                                        </a>
                                        <a class="second__img animation1" href="<?php echo $link; ?>">
                                            <img src="https://roshan1.b-cdn.net/<?php echo $thumbanil2; ?>" alt="product images">
                                        </a>
                                    </div>
                                    <div class="content">
                                        <h2><a href="<?php echo $link; ?>">Ali Smith</a></h2>
                                        <ul class="rating d-flex">
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li class="on"><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                            <li><i class="fa fa-star-o"></i></li>
                                        </ul>
                                        <p><?php echo $description; ?></p>
                                        <ul class="cart__action d-flex">
                                            <li class="cart"><a href="book_reader/examples/dark_skin.html?book=<?php echo $title; ?>&total_page=<?php echo $total_page; ?>">Read</a></li>
                                            <li class="wishlist"><a href=""></a></li>
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