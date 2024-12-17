<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:22 GMT -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Ebook</title>
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

<!-- Main wrapper -->
<div class="wrapper" id="wrapper">
    <!-- Header -->
    <?php 
        include('navbar.php');
        include('cons.php');
    ?>
    <!-- Start Search Popup -->
    <div class="box-search-content search_active block-bg close__top is-visible">
        <form action="api.php" id="search_mini_form" class="minisearch">
            <div class="field__search">
                <input type="hidden" name="function_name" value="req_book" />
                <input type="text" name="book_name" placeholder="Write Book name here..." required>
                <div class="action">
                    <a href="#"><i class="zmdi zmdi-search"></i></a>
                </div>
                <p style="color: gray; text-align: left; margin-top: 10px;">We shall try to add the requested book soon. Thanks.</p>
                <div class="button-box" style="display: flex; margin-top: 15px;">
                    <button class="register-btn btn" type="submit">
                        <span id="next-btn-for-loader">Submit</span>
                    </button>
                </div>
            </div>
            
        </form>
        <div class="close__wrap" onclick="window.location.href='index.php'">
            <span>close</span>
        </div>
    </div>
    <!-- End Search Popup -->
    <!-- //Header -->
    <!-- <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 m-auto">
                    <h3 class="text-center m-2">Request a Book</h3>
                    <h4 class="text-center m-2" style="font-weight: normal;">Please enter the name of the Book you'd like to request.</h4>

                    <div class="login-form-container d-flex">
                        <form class="mx-auto">
                            <input type="text" name="request_book_name" placeholder="Write Book name here..." style="padding: 10px 5px; width: 280px;" required="">
                            <p>We shall try to add the requested book soon. Thanks.</p>
                            <div class="button-box" style="display: flex; margin-top: 15px;">
                                <button class="register-btn btn" type="submit">
                                    <span id="next-btn-for-loader">Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <button id="triggerToastButton" class="btn btn-primary">Show Notification</button>


    </section> -->
    
    <?php include('footer.php') ?>
</div>
<!-- //Main wrapper -->

<!-- JS Files -->
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>

<script>
</script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:57 GMT -->
</html>