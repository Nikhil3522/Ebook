
<!doctype html>
<html class="no-js" lang="en">


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
    <style>
        p{
            font-size: 16px;
        }

        label{
            font-size: 16px;
            color: gray;
        }

        input{
            height: 30px;
            min-width: 280px;
            border: 1px solid gray;
            border-bottom: 2px solid #0046b5;;
        }
    </style>
</head>

<body>

<!-- Main Wrapper Start -->
<div class="main-wrapper">
    <?php
        include('navbar.php');
    ?>
    <div class="breadcrumb-style-2 text-center mt-3 mb-3">
        <h2><?php echo $lang_data['My_Account']; ?></h2>
    </div>
   
    <!-- Page Conttent -->
    <main class="my-account-wrapper section-pt-90 section-pb-90">
        <div class="container">
            
            <div class="tab-content dashboard-content">
                <div class="tab-pane active" id="account-details">
                    <div class="row">
                        <div class="col-lg-12 col-xl-12 col-md-12 border-bottom-2 pb--30">
                            <div class="account-form-container-wrapper">
                                <div class="login">
                                    <div class="account-form-container">
                                        <div class="account-login-form">
                                            <form id="myForm" action="" method="post" onsubmit="return validationform()">
                                                <div class="my-account-form-wrap white">
                                                    <h3 class="title__be--2 mb-3" style="display: inline-block; border-bottom: 2px solid #f00028;">General <span class="color--theme">Information</span></h3>
                                                    <p>By letting us know your name, we can make our support experience much more personal.</p>
                                                    <div class="row account-input-box">
                                                        <div class="col-md-12 single-input-box mt-3">
                                                            <label>First Name:</label>
                                                            <br>
                                                            <input type="text" name="fname" id="fname" value="<?php echo $fname ?>">
                                                        </div>
                                                        <div class="col-md-12 single-input-box mt-2">
                                                            <label>Last Name:</label>
                                                            <br>
                                                            <input type="text" name="lname" id="lname" value="<?php echo $lname ?>">
                                                        </div>
                                                        <div class="col-md-12 single-input-box mt-2">
                                                            <label>Mobile Number:</label>
                                                            <br>
                                                            <input type="text" name="msisdn" id="msisdn" value="+<?php echo $msisdn;?>" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="button-box mt-3">
                                                    <button 
                                                    id="next-btn-for-loader"
                                                        type="submit"
                                                        name="submitdet"
                                                        class="btn theme-color-four"
                                                        style="background-color: #f00028; border: none; min-width: 130px; max-width: 130px; color: white;"
                                                    >Save Changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div class="my-account-form-wrap white mt--30 mb-5">
                            <div class="row account-input-box">
                                <div class="col-md-12 single-input-box">
                                    <label>Current Plan:</label>
                                    <br>
                                    <input type="text" value="<?php echo $planName;?>" disabled>
                                </div>
                            </div>
                            <div class="button-box mt-3">
                                <button 
                                    onclick="buttonLoader(this, 'my-account.php?action=1&mdn=<?php echo $msisdn;?>')" 
                                    class="btn theme-color-four" 
                                    style="background-color: #f00028; border: none; min-width: 130px; max-width: 130px; color: white;"
                                >Unsubscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </main>    
    
    <?php 
        include('footer.php');
    ?>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="subscribe-btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="zmdi zmdi-close s-close"></i></button>
                </div>
                <div class="modal-body">
                    <h5 id="exampleModalLabel">Ready to watch? Enter your email to create or restart your membership.</h5>
                    <div class="create-membership-wrap modify">
                        <input placeholder="Email Address">
                        <button class="landing-btn-style" type="button">Get Started</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Main Wrapper End -->

<!-- JS
============================================ -->

<!-- JS Files -->
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>


</body>


<!-- Mirrored from htmldemo.net/streamo/streamo/my-account-2.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Aug 2024 07:19:46 GMT -->
</html>