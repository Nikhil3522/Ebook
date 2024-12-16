<?php
$json = file_get_contents('php://input'); 
$obj  = json_decode($json);
require_once('config/defines.php');
ini_set('error_log',BASE_LOG_PATH.'/notification_'.date('Y-m-d').'.log');
error_log( "[NOTIFICATION | callbackProcess.php] [DATA = ".$json."]");
require_once( 'services/NotificationFunctions.php' );
$objN=new NotificationFunction();
$querystring = $json;

$bp = BILLER_ID;
$publisher = PUBLISHER;



/*
{mode":3,"productid":"23401220000030726","processingtime":" 2022-07-04T05:53:45+00:00"," traceuniqueid":"16551388021419560","msisdn":"93956248198","channelid":"1", "modedescriptionn":" RENEWAL","chargeamount":"50.0","spid":"90901 ","serviceid":"23401200", " validitydatetime":"2022-07-05T05:53:45+00:00", "keyword": "sub","language": "en_GB", “consent_type”: “IVR”, “bearerid”: “SDP”}
*/

$price_deducted=$obj->chargeamount;
$msisdn = $obj->msisdn;
$action = $obj->mode; //1: SUBSCRIBE (Customer Select Auto Renewal),2: UNSUBSCRIBE,3: RENEWAL,4: SUSPEND,5: PAYMENT (Customer Select One Time Subscription),6: LOW_BALANCE,7: TOPUP,8: TB (Customer Select Auto Renewal),9: FALLBACK,10: OBD,11: GUEST,12: TB1 (Customer Select One Time Subscription)

$userFlag = 0;

$billingInfo = array();
$billingInfo['publisher']=$publisher;
$billingInfo['bp']= $bp;
$billingInfo['msisdn']= $msisdn ;
$getTransactionDetailsByMsisdn = $objN->getTransactionDetailsByMsisdn($msisdn,$bp);
$transactionTime = @$getTransactionDetailsByMsisdn['trtime'];
$cmpid = @$getTransactionDetails['cmpid'];
$dateCurr = date('Y-m-d');
$smsFlag = 0;

############################ START  SAVE NOTIFICATION ##############
if($action =='6'  ){
		$price_deducted=0;
		$userAction = 'GRACE';
		$userFlag = 1;
		$smsFlag = 1;
}elseif($action =='1'  || $action =='5'  || $action =='11'  || $action =='8' || $action =='12'){
	    $userFlag = 1;
		$userAction = 'ACT';
		$smsFlag = 1;
}elseif($action =='3' || $action =='9'){ 
		 $userFlag = 1;	
		 $userAction = 'REN';
}elseif($action =='4'){ 
		 $userAction = 'RENFAIL';		 
}elseif($action == '2'){
		$price_deducted=0;
		$userAction = 'DCT';
}else{
		$price_deducted=0;
		$userAction = 'FAIL';
}
$mode = 'wap';
$saveNotification = $objN->notificationResponse($bp,$publisher,$querystring,$userAction,$price_deducted,$msisdn,$mode);
############################ START  SAVE NOTIFICATION ##############
if($smsFlag=='1'){
	
	//$objN->sendSms($msisdn,TEXT_MSG);
	
}



if($userAction == 'ACT' ){

				$billingInfo['billing_status']= 'DONE';
				$billingInfo['AmountCharged'] = $price_deducted ;
					$result = $objN->updateTransactionNotificationResponse($billingInfo);
				################# END SEND SMS SCRIPT ##############

}elseif($userAction == 'DCT'){ //UNSUBSCRIPTION CASE
			$objN->unsubscription($msisdn,$bp,$publisher);die;

}else{
		
		if($userAction == 'GRACE'){
			$billingInfo['billing_status']= 'GRACE';
			$billingInfo['AmountCharged'] = 0 ;
			$result = $objN->updateTransactionNotificationResponse($billingInfo);
		}

}

$ProductId = $obj->productid;
$downloadLimit = 0;
if($ProductId == '930009830019092'){
	$period_to =7;
	$PACKID =33;
}elseif($ProductId == '930009830019093'){
	$period_to =30;
	$PACKID =34;
	$downloadLimit = DOWNLOAD_LIMIT_MONTHLY;
	$userDetails = $objN->getSubscribedUserDetails1($bp, $msisdn,$publisher);
	if(!empty($userDetails)){
		
			$downloadCount = $userDetails['download_count'];
			if($downloadCount > 0){
				$chargedate = date('Y-m-d',strtotime($userDetails['charged_date']));
				$Lchargedate = strtotime($chargedate);
				$thirtyDaysAgo = strtotime('-20 days');
				if($Lchargedate > $thirtyDaysAgo){
					$downloadLimit = 0;
				}
			}
	}
}else{
	$period_to =1;
	$PACKID =PACKID;
}


if($userFlag=='1'){

			################## ADD USER IN DETAIL TBL#######


		$subscribed_user_pack = array(
			'msisdn'=>$msisdn,
			'encryptedMdn'=>$msisdn,
			'product_id'=>$ProductId,
			'status'=>'A',
			'biller_id'=>$bp,
			'download_limit'=>$downloadLimit,
			'pack_id'=>$PACKID,
			'cmpid'=>$cmpid,
			'subscription_date'=>date('Y-m-d H:i:s'),
			'charged_date'=>date('Y-m-d H:i:s'),
			'renewal_date'=>date('Y-m-d H:i:s', strtotime("+".$period_to." days"))
			
		); 
$UserAdd = $objN->AddUpdateSubscribedDetails($subscribed_user_pack,$bp,$publisher);
		################## END ADD USER IN DETAIL TBL#######
}


?>