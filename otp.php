
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
    #resend-otp-btn{
        border: none;
        background: transparent;
        color: #0248b7;
        text-decoration: underline;
        font-size: 13px;
        font-weight: 600;
    }

    @keyframes blink {
        0%, 50%, 100% { opacity: 1; }
        25%, 75% { opacity: 0.1; }
    }

    #otp-limit-msg {
        color: red;
        font-size: 13px;
        text-align: center;
        margin-top: 3px;
        animation: blink 1s ease-in-out 2; /* 1 second duration, blinks 3 times */
    }

</style>

<body>

<!-- Main wrapper -->
<div class="wrapper" id="wrapper">
    <!-- Header -->
    <?php 
        include('navbar.php');
        include('cons.php');
        if(!isset($_SESSION['MSISDN'])){
            header("location:register.php");die;
        }
        if((isset($_SESSION["sign_up"]) && $_SESSION["sign_up"] != 0) && $user_id != 0){
            header("location:index.php");die;
        }
    ?>
    <!-- //Header -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 m-auto">
                    <h3 class="text-center m-2">OTP Verification</h3>
                    <h4 class="text-center m-2" style="font-weight: normal;">Please enter the OTP sent on your mobile number</h4>

                    <div class="login-form-container d-flex flex-column">
                        <form class="mx-auto" action="" method="post" id="myForm" style="display: flex; flex-direction: column;">
                            <div class="login-input-box d-flex">
                                <input type="text" name="otp" id="otp" oninput="limitLengthAndNumbers(this)" maxlength="4" pattern="\d*" inputmode="numeric" style="padding: 10px; border: 1px solid;" placeholder="Enter OTP" required="">
                            </div>
                            <?php if($Wrong_otp_limit_data || $alert_msg){
                                    echo "<p id='otp-limit-msg'>Wrong OTP. ". (5 - $Wrong_otp_limit_data['wrong_otp_count']) ." attempt remaining.</p>";
                                }
                            ?>
                            <div class="button-box" style="display: flex; margin: auto; margin-top: 15px;">
                                <button class="register-btn btn" type="submit">
                                    <span id="next-btn-for-loader">NEXT</span>
                                </button>
                            </div>
                        </form>

                        <button 
                            class="m-auto mt-3"
                            id="resend-otp-btn"
                            onclick="resendOTP()"
                        >
                            Resend OTP <span id="count-down-full">in 0:<span id="otp-count-down">30</span></span>
                        </button>
                            
                    </div>
                </div>
            </div>
        </div>


    </section>
    
    <?php include('footer.php') ?>
</div>
<!-- //Main wrapper -->

<!-- JS Files -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>
<script>
var time_limit = 30; //30 second
var otpCountDown = document.getElementById('otp-count-down');
var countdownFull = document.getElementById('count-down-full');
var timeInterval = null;

function resendOtpCountdown(){
    timeInterval = setInterval(() => {

        if(time_limit === 0){
            clearInterval(timeInterval);
            countdownFull.style.display = 'none';
        }

        if(time_limit < 10){
            otpCountDown.innerText = `0${time_limit--}`;
        }else{
            otpCountDown.innerText = time_limit--;
        }
    }, 1000);
}

function resendOTP(){
    if(time_limit > 0){
        return;
    }

    // Create a form dynamically
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'register.php';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'msisdn';
    input.value = '<?php echo $_SESSION['MSISDN'] ?>';
    form.appendChild(input);

    // Append form to the body and submit
    document.body.appendChild(form);
    form.submit();
}

resendOtpCountdown();

function isNumber(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        return false;
    }
    return true;
}
</script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:57 GMT -->
</html>