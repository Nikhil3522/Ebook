<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from htmldemo.net/boighor/boighor/shop-grid.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:45:31 GMT -->
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
    
    .mean-bar{
        background: white !important;
    }
</style>

<body>

    <div id="loader">
        <img src="loader/loader.gif" />
    </div>
    <!-- Main wrapper -->
    <div class="wrapper" id="wrapper">

        <?php 
            include('navbar.php');
            include('cons.php');
        ?>
        <!-- Start Shop Page -->
        <div class="page-shop-sidebar left--sidebar bg--white section-padding--lg" style="border-bottom: 1px solid gray; display: flex; justify-content: center; min-height: 92vh;">
            <div class="container" style="margin-top: 60px;">
                <div class="row">
                    <h2 style="text-align: center; color: #60bce5;">Create an account</h2>
                    <h5 style="text-align: center; color: #60bce5; font-weight: normal;">Please enter your Mobile Number to create your account</h5>
                    
                    <div>
                    <div class="user-input-form-container">
                        <form action="otp.php" method="POST">
                            <input placeholder="Enter your Mobile Number here...">
                            <div class="d-flex">
                                <button type="submit" class="m-auto next-btn">NEXT</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Shop Page -->
        <?php include('footer.php'); ?>
    </div>
    <!-- //Main wrapper -->

    <!-- JS Files -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('wrapper').style.display = 'block';
        })
    </script>
    <script src="js/vendor/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/vendor/bootstrap.min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/active.js"></script>
    <script src="js/script.js"></script>
</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/shop-grid.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 14 Nov 2024 12:45:56 GMT -->
</html>