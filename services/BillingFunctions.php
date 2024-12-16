<?php
class BillingFunction
{

###################### START GET CAMP DETAILS BY ID #################
	public function getCampById($cmpid) {

			GLOBAL $conn;
			$query = "SELECT pack_id,camaping_name,hold_prcnt,sent_cnt,skip_cnt,current_cnt,is_new,type,biller_id,publisher FROM bp_campaign_packs_link where cmpid=$cmpid and status = 1";

			
			$result = mysqli_query($conn,$query);
			$row=mysqli_fetch_assoc($result);
			return $row;
		}

###################### END GET PACK DETAILS BY ID #################

###################### START GET PACK DETAILS BY ID #################
	public function getPackById($packId) {

			GLOBAL $conn;
			$query = "SELECT pack_id,name,pack_description,type,price,product_id,client_id,product_pwd,duration,download_limit,biller_id,message,cg_img, fc_img,fc_flag,publisher FROM bp_packs where pack_id=$packId and status = 1";

			$result = mysqli_query($conn,$query);
			$row=mysqli_fetch_assoc($result);
			return $row;
		}

###################### END GET PACK DETAILS BY ID #################


###################### GET USER IP ##############
	public function getip()
	  {
		if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
		   /*$ips = explode(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
				for($i=0;$i<=count($ips);$i++){
					$ip = $ips[$i];
				}*/
				 $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		}elseif(!empty($_SERVER['HTTP_CLIENT_IP'])){
		   $ip = $_SERVER['HTTP_CLIENT_IP'];
		}else{
		   $ip = $_SERVER['REMOTE_ADDR'];
		} 
			return $ip;
	   }
###################### END GET USER IP ##############

############################ START USER FIRST HIT ##############################
function setUsersHit($msisdn,$hitip, $campName,$cmpid, $packId, $userAgent, $bp,$publisher,$traffic_type)
	{  		
		GLOBAL $conn;
		$agent = '';
		$date = date('Y-m-d H:i:s');
		$query = "INSERT INTO bp_user_hits set msisdn='$msisdn',ip_address='$hitip	',interface='$campName',cmpid='$cmpid',pack_id='$packId',date='".$date."',user_agent='".addslashes($agent)."',biller_id='$bp',publisher='$publisher',traffic_type='$traffic_type'";
		
		//echo $query;die;
		$result   = mysqli_query($conn,$query);
		if( $result ){
				$retVal = mysqli_insert_id($conn);
		}else{
			$retVal =0;
		}

		//error_log("Hit ID =".$retVal." | User Agent =".$user_agent);
		return $retVal;
	}
############################ END USER FIRST HIT ##############################
	
##################### START CHECK SUBSCRIBED USER ############
	public function isSubscribedUser($bp, $msisdn,$publisher='bdgrameenphonecuriouscub')
	{
		GLOBAL $conn;
			$curdate = date('Y-m-d H:i:s');
			$query = "select detail_id	from bp_subscribed_users_details where msisdn='$msisdn' and biller_id='".$bp."' and status='A' ";
					error_log("isSubscribedUser | ".$query);
			$result = mysqli_query($conn, $query );
			$numrows = mysqli_num_rows($result);
			if($numrows>0)
			{
				$msg='subscribed';
			}
			else
			{
				$msg='unsubscribed';
			}
			
			return $msg;


	}

##################### END CHECK SUBSCRIBED USER ############
############## START LAST COOKIE ###################
public function getLastCookieId($msisdn) {
	GLOBAL $conn;
	// Getting the last stored cookie id
    $cookie_id = null;
    $query = "SELECT last_cookie_id FROM bp_subscribed_users_details WHERE msisdn = '$msisdn' LIMIT 1";
    
    if ($result = mysqli_query($conn, $query)) {
        $numrows = mysqli_num_rows($result);
        if ($numrows > 0) {
            $row = mysqli_fetch_assoc($result);
            $cookie_id = $row['last_cookie_id'] ?? null;
        }
        mysqli_free_result($result);
    }


    return $cookie_id;
}

public function setLastCookieId($msisdn){
	GLOBAL $conn;
	// Creating and storing the unique cookie id.
	$uniqueNumber = time();
	$query = "UPDATE bp_subscribed_users_details SET last_cookie_id = '$uniqueNumber' WHERE msisdn = $msisdn LIMIT 1";
	mysqli_query($conn, $query );
	setcookie('last_cookie_id', $uniqueNumber, time() + (60*60*24*365),'/');
}
############## END LAST COOKIE ###################
##################### START CHECK SUBSCRIBED USER ############
public function getUserName($msisdn)
{
	GLOBAL $conn;
		// $query = "select param1, param2 from bp_subscribed_users_details where msisdn ='$msisdn' LIMIT 1"
		// $result = mysqli_query($conn, $query );
		// return $row;
}

##################### END CHECK SUBSCRIBED USER ############
##################### START CHECK SUBSCRIBED USER ############
	public function getSubscribedUserDetails($bp, $msisdn,$publisher='roshan')
	{
		GLOBAL $conn;
			$curdate = date('Y-m-d H:i:s');
			$row="";
			$query = "select *	from bp_subscribed_users_details where msisdn='".$msisdn."' and biller_id='".$bp."' and status='A' order by detail_id desc limit 1 ";
					error_log("getSubscribedUserDetails | ".$query);
			$result = mysqli_query($conn, $query );
			$numrows = mysqli_num_rows($result);
			if($numrows>0)
			{
				$row=mysqli_fetch_assoc($result);
			}
			
			
			return $row;
	}

##################### END CHECK SUBSCRIBED USER ############
##################### START GET ADNETWORK CLICK ID ##############
	public function getAdnetworkId($bp,$interface,$get)
	{
		GLOBAL $conn;
	    $exp = explode("_",$interface);

		  //$adnetQuery="SELECT click_parameter from bp_adnetworks where '".$interface."' LIKE CONCAT( '%', name, '%' ) AND biller_id='$bp' AND status='1' order by id desc limit 1"; 
		  $adnetQuery="SELECT click_parameter from bp_adnetworks where name='".$exp[0]."' AND biller_id='$bp' AND status='1' order by id desc limit 1";
		error_log("[BF=getAdnetworkId] | [AdnetworkQuery=$adnetQuery");
		$adnetRes=mysqli_query($conn,$adnetQuery);
		if(mysqli_num_rows($adnetRes)>0){
			$adnetRow=mysqli_fetch_assoc($adnetRes);
			$click_parameter=$adnetRow['click_parameter'];
			if(isset($get[$click_parameter]) && !empty($get[$click_parameter])){
				$adnetworkid=$get[$click_parameter];
			}else{

				$adnetworkid = 'NA';
			}
		}else{
				$adnetworkid = 'NA';
		}
		//error_log("[BF=getAdnetworkId] | [AdnetworkId=$adnetworkid]");
			return $adnetworkid;
	}

##################### END GET ADNETWORK CLICK ID ##############

########################## GET RANDOM NUMBER ###############
	public function random19($num) {
	  $number = "";
	  for($i=0; $i<$num; $i++) {
		$min = ($i == 0) ? 1:0;
		$number .= mt_rand($min,9);
	  }
	  return $number;
	}
public function randomNumericString($num) {
	  $number = "";
	  for($i=0; $i<$num; $i++) {
		$min = ($i == 0) ? 1:0;
		$number .= mt_rand($min,9);
	  }
	  return $number;
	}
	public function random_strings($length_of_string) 
{ 
  
    // String of all alphanumeric character 
    $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
  
    // Shufle the $str_result and returns substring 
    // of specified length 
    return substr(str_shuffle($str_result),  
                       0, $length_of_string); 
} 

############################  ADD TRANSACTION DATA ##########################
	public function addTransactionData($billingData) {

		GLOBAL $conn;
		$query = "INSERT IGNORE INTO bp_transaction set subscribed_user_id='".$billingData['subscribed_user_id']."', msisdn='".$billingData['msisdn']."',  pack_id='".$billingData['pack_id']."', product_id='".$billingData['product_id']."', transaction_time='".$billingData['transaction_time']."', transaction_unique_id='".$billingData['transaction_unique_id']."', requested_price='".$billingData['requested_price']."', interface='".$billingData['interface']."',  adnetwork_id='".$billingData['adnetwork_id']."', biller_id='".$billingData['biller_id']."', hit_id='".$billingData['hit_id']."'  , publisher='".$billingData['publisher']."', pub_id='".$billingData['pub_id']."', ip_address='".$billingData['ip_address']."', param3='".$billingData['param3']."', param2='".$billingData['param2']."', encryptedMdn='".$billingData['encryptedMdn']."', cmpid='".$billingData['cmpid']."'";
		error_log("addTransactionData Query=".$query);
		$result   = mysqli_query( $conn,$query );
		if( $result ){
			$result1['transaction_id']=mysqli_insert_id($conn);
			$result1['message']='success';
		}else{
			$error=mysqli_error();
			//$this->sendalert("addTransactionData Error: ".$error);
			$result1['message']='fail';
		}
		return $result1; 
	}

	######################### START UPDATE CONSENT ####################
public function consentUpdateData($tid){
	GLOBAL $conn;
	$currDate = date('Y-m-d H:i:s');
	$todayTranDate = date("Y-m-d");
	
	$query="update bp_transaction set consent=1 where transaction_unique_id='".$tid."' and consent=0";
	$result=mysqli_query($conn,$query);
	error_log("Consent given TID=".$tid);
	return true;
}

######################### END UPDATE CONSENT ####################


public function chkipexists($bp)
  {
		GLOBAL $conn;
		$success = 0;
		 
		
		
		if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) && $success == '0') {
		
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			$success = $this->ip_is_private ($ip);
					
		   /*$ips = explode(',',$_SERVER['HTTP_X_FORWARDED_FOR']);
				for($i=0;$i<=count($ips);$i++){
					 if(!empty($ips[$i])){

					$ip = $ips[$i];
	
					$success = $this->ip_is_private ($ip);
					if($success == '1'){
						break;
					}
				}
		
				}*/
		} 
		
		if (!empty($_SERVER['HTTP_CLIENT_IP']) && $success == '0') {
		
		   $ip = $_SERVER['HTTP_CLIENT_IP'];
			$success = $this->ip_is_private ($ip);
		} 
		
		
		if (!empty($_SERVER['REMOTE_ADDR']) && $success == '0') {
		
		   $ip = $_SERVER['REMOTE_ADDR'];
		   $success = $this->ip_is_private ($ip);
		}
     

		 $ret = '';
          $query = "select id from ip_pool where INET_ATON('".$ip."') between INET_ATON(first_ip) and INET_ATON(last_ip) and biller_id='smrtidn'" ;
		  $result=mysqli_query($conn,$query);
		  $numrows = mysqli_num_rows($result);
		 if($numrows>0){
			$ret = 1;
			//error_log("check ip ret =".$ret);
		 }
		 error_log("check ip ret =".$ret." | Query = ".$query);
		return $ret;
		 		
		
   }
   
   
   
   
   public function ip_is_private ($ip) {
    $pri_addrs = array (
                      '10.0.0.0|10.255.255.255', // single class A network
                      '172.16.0.0|172.31.255.255', // 16 contiguous class B network
                      '192.168.0.0|192.168.255.255', // 256 contiguous class C network
                      '169.254.0.0|169.254.255.255', // Link-local address also refered to as Automatic Private IP Addressing
                      '127.0.0.0|127.255.255.255', // localhost
                     );

    $long_ip = ip2long ($ip);
    if ($long_ip != -1) {

        foreach ($pri_addrs AS $pri_addr) {
            list ($start, $end) = explode('|', $pri_addr);

             // IF IS PRIVATE
             if ($long_ip >= ip2long ($start) && $long_ip <= ip2long ($end)) {
                 return 0;
             }
        }
    }

    return 1;
}
   
 ########################## START GET TRANSACTION DETAILS ##############

public function getTransactionDetailsByTid($trnsaction_unique_id){
	GLOBAL $conn;
	$row = array();
		$query = "SELECT pack_id, biller_id,product_id,requested_price,price_deducted,billing_status,interface,publisher,pub_id,transaction_time,msisdn FROM bp_transaction where transaction_unique_id='".$trnsaction_unique_id ."'";
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
		
			$insert = mysqli_query($conn,"insert into bp_subscribed_users_details set msisdn='".$msisdn."',encryptedMdn = '".$encryptedMdn."' ,product_id='".$product_id."' ,download_count=0, status='".$detailData['status']."', biller_id='".$bp."',pack_id='".$pack_id."'
			,cmpid='".$cmpid."',charged_date='".$detailData['charged_date']."',renewal_date='".$detailData['renewal_date']."',user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."', publisher='".$publisher."'");

		}else{
			if(!empty($cmpid)){
			$update = mysqli_query($conn,"update bp_subscribed_users_details set product_id='".$product_id."',download_count=0,status='".$detailData['status']."', pack_id='".$pack_id."',
			cmpid='".$cmpid."',charged_date='".$detailData['charged_date']."',renewal_date='".$detailData['renewal_date']."',user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."' where msisdn = '".$msisdn."' and biller_id = '".$bp."' and publisher='".$publisher."'");
			}else{

			$update = mysqli_query($conn,"update bp_subscribed_users_details set product_id='".$product_id."',download_count=0,status='".$detailData['status']."', pack_id='".$pack_id."',
			charged_date='".$detailData['charged_date']."',renewal_date='".$detailData['renewal_date']."',user_id='".$subscribed_user_id."',download_limit='".$detailData['download_limit']."',subscription_date='".date('Y-m-d H:i:s')."' where msisdn = '".$msisdn."' and biller_id = '".$bp."' and publisher='".$publisher."'");

			}
		}		

	//$rtarr = array('message'=>$message,'pack_id'=>$packid);
	//return true;
	}
#################### ADD/UPDATE USERS #############################
##################### USER STATUS CHECK BY API ##########################
public function statusApi($requestData){

		$msisdn = $requestData['msisdn'];
		$tid = $requestData['tid'];
		//$productid = $requestData['pid'];
		$channelid = CHANNELID;
		$dataString =   array("username"=>USR_NAME,"password"=>USR_PWD,"msisdn"=>$msisdn,"spid"=>SP_ID,"serviceid"=>SERVICE_ID,"channelid"=>"$channelid","requestid"=>$tid,"shortcode"=>SRTCODE);
		error_log("CALL STATUS API START");
		$jsonData = json_encode($dataString);
		$jurl = STATUS_API;
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
        error_log("CALL STATUS API END ");
  error_log(" STATUS_API REQUEST URL= ".$jurl." | Request Data = ".$jsonData." | Response Data = ".$result." | HTTP STATUS =".$sitestatus);
return $response;


}
##################### END USER STATUS CHECK BY API ##########################

######################### START SUBSCRIBE API #######################
public function subscriptionApi($requestData){

		$msisdn = $requestData['msisdn'];
		$tid = $requestData['tid'];
		$productid = $requestData['pid'];
		$channelid = CHANNELID;
		$dataString =   array("username"=>USR_NAME,"password"=>USR_PWD,"msisdn"=>$msisdn,"spid"=>SP_ID,"serviceid"=>SERVICE_ID,"channelid"=>"$channelid","requestid"=>$tid,"productid"=>$productid);

		$jsonData = json_encode($dataString);
		$jurl = SUBSCRIBE_API;
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
        
  error_log(" SUBSCRIPTION REQUEST URL= ".$jurl." | Request Data = ".$jsonData." | Response Data = ".$result." | HTTP STATUS =".$sitestatus);
return $response;


}
######################### END SUBSCRIBE API #######################

}//closing of class

?>
