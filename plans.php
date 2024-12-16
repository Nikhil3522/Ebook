<?php
session_start();
ob_start();
require_once('config/defines.php');
ini_set('error_log',BASE_LOG_PATH.'/landing_request_'.date('Y-m-d').'.log');
require_once('services/BillingFunctions.php');
$headers = getallheaders();
$headers = array_change_key_case($headers,CASE_LOWER);
$header_resp='';
foreach( $headers as $header => $value ){
	$header_resp .= " | [$header=$value]";
}
error_log( "[FIRST PAGE |  plans.php] [".urldecode(http_build_query($_REQUEST,'|'))."] [HEADERS = ".$header_resp."]\n");

$msisdn='';
$bp = BILLER_ID;
$publisher = PUBLISHER;

$objB=new BillingFunction();
if (isset($_GET['cmpid']) && !empty($_GET['cmpid'])){
	$cmpid = trim($_GET['cmpid']);
} else {
	$cmpid = CMPID;
}
if(isset($_GET['clickid']) && !empty($_GET['clickid'])){
				$adnetworkid= $_GET['clickid'];
}else{
				$adnetworkid='NA';
}

$_SESSION['ADNETWORK_ID'] = $adnetworkid;




?>



<!DOCTYPE html>
<html lang="eng">

<head>
    <title>Landing Page</title>
    <!--META-->
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <meta name="apple-mobile-web-app-status-bar-style" content="#fddedb">
    <!--end-->
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!--Link CSS File-->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<style>
	/* IMAGE STYLES */
[type=radio] + img {
  cursor: pointer;
}
label {
margin: 10px;
}
body, html,form,p,div, .appform .mobile_screen, .mainwrapper {background:#ffffff; }
html, body{height:100%;} 
#outer{
min-height:100%;
}
	</style>
</head>

<body>
    <!--<div class="pageloader is-active"></div>-->
    <div class="mainwrapper" id="outer" >
       
        <div class="mobile_screen" >
             
           <!-- <div class="appimg">
                <img src="images/banner.png" class="img-responsive" />
            </div>-->


                <form method="post" action="requestProcess.php">
                    <div class="appform" style="width:99%">
                        <p style="font-size:16px;font-weight:bold;color:#ef3221;"><?php echo PRODUCT_NAME;?></p>
						<p style="font-size:12px;font-weight:bold;color:#000000;">Read  unlimited Ebooks online.</p>
						<label>
						  <input type="radio" name="cmpid" value="106" checked>
						  AFN 10 /Day 
						</label>
						<br>
						<label>
						  <input type="radio" name="cmpid" value="107" >
						  AFN 20 /Week
						</label>
						<br>
						<label>
						  <input type="radio" name="cmpid" value="108" >
						  AFN 90 /Month
						</label>
						<br/>
                           
						   
						   <br/>
							
							<div class="form-group shwhde" >
                            <div class="input-group" >
                                <span class="input-group-addon" >+93</span>
                                <input id="userMsisdn" type="text" class="form-control" name="userMsisdn"  value="" onkeypress="return isNumber(event);" required>
                            </div>
                        </div>

							 <div class="form-group" style="display: grid;">
                               <input type="submit" name="submit" class="submit_btn" value=" Subscribe "  >
								
                            </div>
							
						<div class="form-group">
							<p  class="shwhde" >Already Registered? <a href="#">Login</a></p>
						</div>
						<div class="form-group">&nbsp;</div>
						<div class="form-group">&nbsp;</div>
						
						
                    </div>
                   
                </form>
            
            
            <!--english form end-->

            <!--other language form-->

                <!--code paste here-->

            <!--other language form-->
        </div>
        
    </div>
      
        <!--scripts-->
        <script src="js/jquery-2.2.4.min.js"></script>
        <script src="js/bootstrap.min.js"></script>

      
      

       
</body>
</html>
<script>


function isNumber(e){
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /\d/.test(String.fromCharCode(charCode));
}
</script>