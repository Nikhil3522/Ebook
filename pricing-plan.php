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
	.pricing-plan-card{
		position: relative;
		width: 280px;
		margin: auto;
	}

	.pricing-plan-card:nth-child(2) {
		margin-top: -20px;
	}

	.pricing-plan-card button{
		width: 150px;
		height: 40px;
		margin: auto;
		color: white; 
		font-size: 16px;
		border: none;
		border-radius: 10px;
	}

	.pricing-plan-card h1{
		font-weight: 600;
		color: #ffffff;
		font-size: 30px;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		background: #000000;
		line-height: 90px;
		text-align: center;
		position: absolute;
		margin-top: -45px;
		margin-left: 85px;
	}

	.pricing-plan-card > div:first-child{
		min-height: 120px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	.pricing_plan_ul{
		padding: 10px;
	}

	.pricing_plan_ul li{
		border-bottom: 1px solid #c4c2c2;
		height: 35px;
		text-align: center;
		font-size: 15px;
		margin-top: 10px;
	}

	.box {
  display: inline-block;
  width: 250px;
  aspect-ratio: 1;
  margin: 20px;
  background: #ccc;
  position: relative;
  font-size: 25px;
  font-family: sans-serif;
}
.ribbon {
  --f: 15px; /* control the folded part */
  position: absolute;
  top: 0;
  color: #fff;
  padding: .1em 1.8em;
  background: #e07134;
  border-bottom :var(--f) solid #0007;
  clip-path: polygon(
    100% calc(100% - var(--f)),100% 100%,calc(100% - var(--f)) calc(100% - var(--f)),var(--f) calc(100% - var(--f)), 0 100%,0 calc(100% - var(--f)),999px calc(100% - var(--f) - 999px),calc(100% - 999px) calc(100% - var(--f) - 999px))
}
.right {
  right: 0;
  transform: translate(calc((1 - cos(45deg))*100%), -100%) rotate(45deg);
  transform-origin: 0% 100%;
}
.left {
  left: 15px;
  transform: translate(calc((cos(45deg) - 1)*100%), -100%) rotate(-45deg);
  transform-origin: 100% 100%;
}

/* a fix for firefox that show some strange lines*/
@supports (-moz-appearance:none) {
  .ribbon {
    background:
      linear-gradient(to top,#0000 1px,#0005 0 var(--f),#0000 0) border-box,
      linear-gradient(var(--c,#45ADA8) 0 0) 50%/
       calc(100% - 2px) calc(100% - 2px) no-repeat border-box;
    border-bottom-color: #0000;
   }
}

@media only screen and (max-width: 600px){
	.pricing-plan-card:nth-child(2) {
		margin-top: 0px;
	}
}
</style>

<body>

<!-- Main wrapper -->
<div class="wrapper" id="wrapper">
    <!-- Header -->
    <?php 
        include('navbar.php');
        include('cons.php');
    ?>
    <!-- //Header -->
    <section>
        <div class="breadcrumb-area breadcrumb-modify-padding">
            <div class="container">
                <div class="in-breadcrumb">
                    <div class="row">
                        <div class="col" style="text-align: center; margin-top: 20px;">
                            <h2 style="color: #f00028;">CHOOSE YOUR PLAN</h2>
                            <h5>Sign up in less than a minute.</h5>
                            <!-- <p>Watch on your computer, mobile phone, and tablet anywhere anytime.</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pricing-wrap section-pb-60" style="margin-bottom: 80px; margin-top: 80px;">
            <div class="container d-flex">
                <div class="row row-cols-md-3 row-cols-1" id="pricing_plan_card_container" style="margin: auto; row-gap: 40px;">
                    
					<div class="pricing-plan-card">
						<div style="background: #f00028;">
							<h2 class="text-center pt-3" style="color: white;">Daily</h2>
						</div>
						<h1><img src="images/icons/AFN-currency.png" style="width: 30px; height: 60px; margin-top: -10px;"><span>10</span></h1>
						<div style="min-height: 300px; background: whitesmoke; padding-top: 45px; padding-bottom: 10px; display: flex; flex-direction: column; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
							<ul class="pricing_plan_ul">
								<li><span class="fw-bold">Pay</span> per day</li>
								<li><span class="fw-bold">No</span> commitment</li>
								<li><span class="fw-bold">Ideal</span> for trials</li>
							</ul>
							<button style="background: #f00028;" onclick="window.location.href='pricing-plan.php?cmpid=106'">Choose Plan</button>
							<p style="font-size: 9px; line-height: 12px; text-align: center;">Cancel anytime, 24/7 customer support</p>
						</div>
					</div>

					<div class="pricing-plan-card">
						<div style="min-height: 140px; background: #1c90e2;">
							<h2 class="text-center pt-3" style="color: white;">Monthly</h2>
						</div>
						<div class="ribbon left">Best Deal</div>
						<h1><img src="images/icons/AFN-currency.png" style="width: 30px; height: 60px; margin-top: -10px;"><span>90</span></h1>
						<div style="min-height: 320px; background: whitesmoke; padding-top: 45px; padding-bottom: 10px; display: flex; flex-direction: column; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
							<ul class="pricing_plan_ul">
								<li><span class="fw-bold">Best</span> value deal</li>
								<li><span class="fw-bold">Unlimited</span> monthly access</li>
								<li><span class="fw-bold">Hassle-free</span> subscription</li>
							</ul>
							<button style="background: #1c90e2;" onclick="window.location.href='pricing-plan.php?cmpid=108'">Choose Plan</button>
							<p style="font-size: 9px; line-height: 12px; text-align: center;">Cancel anytime, 24/7 customer support</p>
						</div>
					</div>


					<div class="pricing-plan-card">
						<div style="background: #dddd21;">
							<h2 class="text-center pt-3" style="color: white;">Weekly</h2>
						</div>
						<h1><img src="images/icons/AFN-currency.png" style="width: 30px; height: 60px; margin-top: -10px;"><span>20</span></h1>
						<div style="min-height: 300px; background: whitesmoke; padding-top: 45px; padding-bottom: 10px; display: flex; flex-direction: column; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
							<ul class="pricing_plan_ul">
								<li><span class="fw-bold">Affordable</span> short-term option</li>
								<li><span class="fw-bold">Save</span> on daily rates</li>
								<li><span class="fw-bold">Best</span> for quick use</li>
							</ul>
							<button style="background: #dddd21;" onclick="window.location.href='pricing-plan.php?cmpid=107'">Choose Plan</button>
							<p style="font-size: 9px; line-height: 12px; text-align: center;">Cancel anytime, 24/7 customer support</p>
						</div>
					</div>

                </div>
            </div>
        </div>


    </section>
    
    <?php include('footer.php') ?>
</div>
<!-- //Main wrapper -->

<!-- JS Files -->
<script src="js/vendor/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/active.js"></script>

</body>


<!-- Mirrored from htmldemo.net/boighor/boighor/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 10 Dec 2024 10:59:57 GMT -->
</html>