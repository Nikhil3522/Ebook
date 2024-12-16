<?php

class NotificationFunction{
	
######################### START UPDATE CG RSPONSE ####################
public function updateTransactionNotificationResponse($billingInfo){
	GLOBAL $conn;
	$currDate = date('Y-m-d H:i:s');
	$todayTranDate = date("Y-m-d");
	//$price_deducted = " ,price_deducted='".$billingInfo['AmountCharged']."'";

	$query="UPDATE bp_transaction SET billing_response_time='".$currDate."', billing_status = '".$billingInfo['billing_status']."',price_deducted='".$billingInfo['AmountCharged']."' WHERE msisdn='".$billingInfo['msisdn']."' and date(transaction_time)='".$todayTranDate."'  order by transaction_id desc limit 1";

	error_log("updateTransactionNotificationResponse Query = ".$query);
	$result=mysqli_query($conn,$query);

}

######################### END UPDATE CG RSPONSE ####################

############################ START SAVE NOTIFICATION RESPONSE  ##############################
    public function notificationResponse($bp,$publisher,$querystring,$userAction,$price_deducted,$msisdn,$mode){  		
		GLOBAL $conn;
		$currDate = date('Y-m-d H:i:s');
		$srcmode = 'WAP';
		if($mode=='SMS'){
			$srcmode = $mode;
		}
		$query = "insert into notification_response set date='".$currDate."',response='".$querystring."',biller_id='".$bp."',publisher='".$publisher."',status='0', action='".$userAction."',price='".$price_deducted."', mdn='".$msisdn."',mode='".$srcmode."'";

		error_log("Subscription callback notificationResponse Query= ".$query);
		$result   = mysqli_query($conn,$query);
		if( $result ){
				$retVal = mysqli_insert_id($conn);
		}else{
			$retVal =0;
		}
		return $retVal;
	}
############################ END SAVE NOTIFICATION RESPONSE ##############################
########################## START GET TRANSACTION DETAILS ##############

public function getTransactionDetailsByTid($trnsaction_unique_id){
	GLOBAL $conn;
	$row = array();
		$query = "SELECT cmpid,pack_id, biller_id,product_id,requested_price,price_deducted,billing_status,interface,publisher,pub_id,transaction_time,msisdn FROM bp_transaction 
		where transaction_unique_id='".$trnsaction_unique_id ."'";
		$result = mysqli_query($conn,$query) ;
		$numrow = mysqli_num_rows($result );
		if($numrow > 0){
			$row=mysqli_fetch_assoc($result);
		}
		return $row;


}
public function getTransactionDetailsByMsisdn($msisdn,$bp){
	GLOBAL $conn;
	$row = array();
		$query = "SELECT cmpid,pack_id, biller_id,product_id,requested_price,price_deducted,billing_status,interface,publisher,pub_id,date(transaction_time) as trtime,msisdn FROM bp_transaction 
		where msisdn='".$msisdn ."' and biller_id='".$bp."' ORDER by transaction_id DESC LIMIT 1"; 
		$result = mysqli_query($conn,$query) ;
		$numrow = mysqli_num_rows($result );
		if($numrow > 0){
			$row=mysqli_fetch_assoc($result);
		}
		return $row;


}
########################## END GET TRANSACTION DETAILS ################

#################### ADD/UPDATE USERS #############################
public function AddUpdateSubscribedDetails($detailData,$bp,$publisher=PUBLISHER){
	
	GLOBAL $conn;
		$msisdn = $detailData['msisdn'];
		$encryptedMdn = $detailData['encryptedMdn'];
		$product_id = $detailData['product_id'];
		$message = 'Success';
		$pack_id = $detailData['pack_id'];
		$cmpid = $detailData['cmpid'];
		$charged_date = $detailData['charged_date'];
		
		

		
		$subscribed_user_id = 0;
		$chkalreadyExist = mysqli_query($conn,"select user_id from bp_subscribed_users_details where msisdn = '".$msisdn."'  and biller_id = '".$bp."' and publisher='".$publisher."'");
		$numrow = mysqli_num_rows($chkalreadyExist );
		if($numrow < 1){
		
			$insert = mysqli_query($conn,"insert into bp_subscribed_users_details set msisdn='".$msisdn."',encryptedMdn = '".$encryptedMdn."' ,product_id='".$product_id."' , status='".$detailData['status']."', biller_id='".$bp."',pack_id='".$pack_id."'
			,cmpid='".$cmpid."',charged_date='".$detailData['charged_date']."',renewal_date='".$detailData['renewal_date']."',user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."', publisher='".$publisher."'");

		}else{
			if(!empty($cmpid)){
			$update = mysqli_query($conn,"update bp_subscribed_users_details set product_id='".$product_id."',status='".$detailData['status']."', pack_id='".$pack_id."',
			cmpid='".$cmpid."',charged_date='".$detailData['charged_date']."',renewal_date='".$detailData['renewal_date']."',user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."' where msisdn = '".$msisdn."' and biller_id = '".$bp."' and publisher='".$publisher."'");
			}else{

			$update = mysqli_query($conn,"update bp_subscribed_users_details set product_id='".$product_id."',status='".$detailData['status']."', pack_id='".$pack_id."',charged_date='".$detailData['charged_date']."' ,renewal_date='".$detailData['renewal_date']."' ,user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."' where msisdn = '".$msisdn."' and biller_id = '".$bp."' and publisher='".$publisher."'");

			}
		}		

	//$rtarr = array('message'=>$message,'pack_id'=>$packid);
	//return true;
	}
#################### ADD/UPDATE USERS #############################

############################# START  UNSUBSCRIBE USER ###################
public function unsubApi($msisdn,$productId){
	GLOBAL $conn;

	   $tid = time().uniqid();
		$dataString =   array("username"=>USR_NAME,"password"=>USR_PWD,"msisdn"=>$msisdn,"spid"=>SP_ID,"serviceid"=>SERVICE_ID,"channelid"=>CHANNELID,"requestid"=>$tid,"productid"=>$productId);

		$jsonData = json_encode($dataString);
		$jurl = UNSUBSCRIBE_API;
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => $jurl,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => 'POST',
		  CURLOPT_POSTFIELDS =>$jsonData,
		  CURLOPT_HTTPHEADER => array(    
			'Content-Type: application/json'
		  ),
		));

		$result = curl_exec($curl);
		$info = curl_getinfo($curl);
		curl_close($curl);
		$sitestatus =  $info['http_code'];

		$response = json_decode($result);
        
  error_log(" UNSUBSCRIPTION REQUEST URL= ".$jurl." | Request Data = ".$jsonData." | Response Data = ".$result." | HTTP STATUS =".$sitestatus);
	return $response;
}
public function unsubscription($msisdn,$bp=null,$publisher=null){
		GLOBAL $conn;
		//$query="UPDATE bp_subscribed_users_details set unsubscription_date='".date('Y-m-d H:i:s')."', status='I' WHERE  biller_id='".$bp."' AND msisdn='".$msisdn."' AND  publisher='".$publisher."'";
		$query="UPDATE bp_subscribed_users_details set unsubscription_date='".date('Y-m-d H:i:s')."', status='I' WHERE  msisdn='".$msisdn."' ";

		$result=mysqli_query($conn,$query);

	}
############################# END  UNSUBSCRIBE USER ###################

############################# START  SEND SMS ###################
public function sendSms($msisdn,$msgg){
	GLOBAL $conn;
	   $length = 29;
		$correlator = substr(bin2hex(random_bytes($length)), 0, $length);
		$tid = time().uniqid();
		$dataString =   array("username"=>USR_NAME,"password"=>USR_PWD,"serviceid"=>SERVICE_ID,"shortcode"=>SRTCODE,"msisdn"=>$msisdn,"message"=>"$msgg","correlator"=>$correlator,"requestid"=>$tid,"spid"=>SP_ID);
		error_log("sendSms CALL STATUS API START");
		$jsonData = json_encode($dataString);
		$jurl = SMS_API;
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => $jurl,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => 'POST',
		  CURLOPT_POSTFIELDS =>$jsonData,
		  CURLOPT_HTTPHEADER => array(    
			'Content-Type: application/json'
		  ),
		));

		$result = curl_exec($curl);
		$info = curl_getinfo($curl);
		curl_close($curl);
		$sitestatus =  $info['http_code'];

		$response = json_decode($result);
        error_log("sendSms CALL STATUS API END");
  error_log(" sendSms REQUEST URL= ".$jurl." | Request Data = ".$jsonData." | Response Data = ".$result." | HTTP STATUS =".$sitestatus);
	return $response;
}

############################# END  SEND SMS ###################


################### START GET DETAILS BY PRODUCT ID ##################
	public function getPackByProductId($product_id) {

			GLOBAL $conn;
			$query = "SELECT * FROM bp_packs where product_id=$product_id and status = 1";

			error_log("getPackByProductId Query =".$query );

			$result = mysqli_query($conn,$query);
			$row=mysqli_fetch_assoc($result);
			return $row;
		}

################### END GET DETAILS BY PRODUCT ID ##################
################### User Details By MSISDN ##################
	public function userDetailsByMsisdn($msisdn,$bp,$publisher) {

			GLOBAL $conn;
			$query = "select * from bp_subscribed_users_details where (msisdn = '".$msisdn."' or user_id='".$msisdn."') and biller_id='".$bp."' and publisher='".$publisher."'";

			error_log("userDetailsByMsisdn Query =".$query );

			$result = mysqli_query($conn,$query);
			$row=mysqli_fetch_assoc($result);
			return $row;
		}

################### END User Details By MSISDN ##################

##################### START CHECK SUBSCRIBED USER ############
	public function getSubscribedUserDetails1($bp, $msisdn,$publisher='roshan'){
		GLOBAL $conn;
			$curdate = date('Y-m-d H:i:s');
			$row="";
			$query = "select *	from bp_subscribed_users_details where msisdn='".$msisdn."' and biller_id='".$bp."' and status='A' order by detail_id desc limit 1 ";
					error_log("getSubscribedUserDetails1 | ".$query);
			$result = mysqli_query($conn, $query );
			$numrows = mysqli_num_rows($result);
			if($numrows>0)
			{
				$row=mysqli_fetch_assoc($result);
			}
			
			
			return $row;


	}

##################### END CHECK SUBSCRIBED USER ############
}//closing of class





?>
