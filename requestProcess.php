<?php
session_start();
ob_start();
require_once('config/defines.php');

ini_set('error_log',BASE_LOG_PATH.'/landing_request_'.date('Y-m-d').'.log');
require_once('services/BillingFunctions.php');

error_log( "[requestProcess.php] [".urldecode(http_build_query($_REQUEST,'|'))."]");

$msisdn='';
$bp = BILLER_ID;
$publisher = PUBLISHER;

$objB=new BillingFunction();
if (isset($_REQUEST['cmpid']) && !empty($_REQUEST['cmpid'])){
	$cmpid = trim($_REQUEST['cmpid']);
	$_SESSION['CMPID'] = $cmpid ;
}elseif(isset($_SESSION['CMPID']) && !empty($_SESSION['CMPID'])){
	$cmpid = $_SESSION['CMPID'];
} else {
	$cmpid = CMPID;
}


$campDetails = $objB->getCampById($cmpid);
$campName = $campDetails['camaping_name'];
$packId = $campDetails['pack_id'];
//echo $packId;die;
################ GET PACK DETAILS BY ID ###################
$packDetails = $objB->getPackById($packId);
$pack_price = $packDetails['price'];
$product_id = $packDetails['product_id'];
$pack_name = $packDetails['name'];
$pack_description = $packDetails['pack_description'];
$pack_validity = $packDetails['duration'];
$cgUrl = $packDetails['message'];
################ END PACK DETAILS BY ID ###################

if(isset($_POST['submit']) && !empty($_POST['userMsisdn'])){

		$usermdn = ltrim($_POST["userMsisdn"], '0');
		$msisdnstr = substr($usermdn,0,2);
		if($msisdnstr == '93'){
			$msisdn = $usermdn;
			$_SESSION['msisdn'] = $msisdn;
		}else{
			$msisdn = '93'.$usermdn;
			$_SESSION['msisdn'] = $msisdn;

		}
		setcookie('mobilenumber', $msisdn, time() + (60*60*24*365),'/');
		
		
		########################## START CHECK ALREADY SUBSCRIBE ############
		$reqArr = array();
		$reqArr['msisdn'] = $msisdn;
		$reqArr['tid'] = time().uniqid();
		//$isSubscribedUser = $objB->isSubscribedUser($bp, $msisdn,$publisher);
		//if($isSubscribedUser == 'subscribed'){
		$statusApi = $objB->statusApi($reqArr);
		if($statusApi->code == '0'){
			header('Content-Type: text/html; charset=utf-8'); 
			$msgg = 'Already Subscribed';
			//$redirectUrl = BASE_URL."?bp=".BILLER_ID."&mdn=".base64_encode($msisdn);
			$redirectUrl = SITE_URL."?mdn=".base64_encode($msisdn);
			echo "<script>window.alert('".$msgg."')
			window.location.href='$redirectUrl'</script>";
			exit();
		}

    ########################## END CHECK ALREADY SUBSCRIBE ############
	###################### START USER HIT ##############

				$hitip = $objB->getip();
				$userAgent ="";
				$usermobiledata ='WIFI';
				//$interface = "pheture_sa_lifepulse";
				//echo '3';

				$user_hit_id=$objB->setUsersHit($msisdn,$hitip, $campName,$cmpid, $packId, $userAgent, $bp,$publisher,$usermobiledata);
				$userAgent =$_SERVER['HTTP_USER_AGENT'];
				//echo '4';

				error_log("setUsersHit | plans.php |  CMPID = ".$cmpid." | msisdn=".$msisdn."| HIT IP =".$hitip." | Hit ID=".$user_hit_id."  | pack_id=".$packId." | bp=".$bp." | userAgent=".$userAgent." | firstHit=".@http_build_query($_GET));
				###################### END USER HIT ##############
				
	####################### START ADD TRANSACTION DATA ###########
	//$user_hit_id = $_SESSION['HIT_ID'];
	$hitip = $objB->getip();
    $billingInfo = array();
    $transaction_time = date("Y-m-d H:i:s");
    $pubId='NA';
	 $adnetworkid= $_SESSION['ADNETWORK_ID'];
	 $transaction_unique_id = time().uniqid();
	 $billingInfo['subscribed_user_id'] = 0;
    $billingInfo['msisdn'] = $msisdn;
    $billingInfo['pack_id'] = $packId;
    $billingInfo['biller_id'] = $bp;
    $billingInfo['product_id'] = $product_id;
    $billingInfo['transaction_time'] = $transaction_time;
    $billingInfo['transaction_unique_id'] =$transaction_unique_id;
    $billingInfo['requested_price'] = $pack_price;
    $billingInfo['interface'] = $campName;
    $billingInfo['adnetwork_id'] = $adnetworkid;
    $billingInfo['hit_id'] = $user_hit_id;
    $billingInfo['publisher'] = $publisher;
    $billingInfo['pub_id'] = $pubId;
    $billingInfo['ip_address'] = $hitip;
    $billingInfo['encryptedMdn'] =$msisdn;
	$billingInfo['cmpid'] =$cmpid;
	$billingInfo['param2'] ='';
	$billingInfo['param3'] ='';
    $TransData = $objB->addTransactionData($billingInfo);
	####################### END ADD TRANSACTION DATA ###########
	
	###################### SUBSCRIBE REQUEST ################
	$reqArr = array();
	$reqArr['msisdn'] = $msisdn;
	$reqArr['tid'] = $transaction_unique_id;
	$reqArr['pid'] = $product_id;
	$subscriptionApi = $objB->subscriptionApi($reqArr);
	$msgg = @$subscriptionApi->message;
	if($subscriptionApi->code == '0' && $subscriptionApi->message == 'ACCEPTED'){

		//$redirectUrl = $subscriptionApi->data->paymentUrl;
		//error_log("REDIRECT TO PAYMENT URL = ".$redirectUrl);
		//header("location:".$redirectUrl);
		sleep(5);
		$redirectUrl = SITE_URL;
        echo "<script>window.alert('Your request accepted succesfully.')
        window.location.href='$redirectUrl'</script>";
        exit();
		
	}else{
		//$msgg = @$subscriptionApi->error;
		if(empty($msgg)){
		$msgg = 'Sorry,Something went wrong.Please try later.';
		}
		$redirectUrl = LP_URL;
        echo "<script>window.alert('".$msgg."')
        window.location.href='$redirectUrl'</script>";
        exit();
	}
}




?>

