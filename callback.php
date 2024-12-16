<?php
$json = file_get_contents('php://input'); 
$obj  = json_decode($json);
require_once('config/defines.php');
ini_set('error_log',BASE_LOG_PATH.'/notification_'.date('Y-m-d').'.log');
$rnd = rand();
error_log( "[NOTIFICATION | callback.php] [DATA = ".$json."]  ID =".$rnd);
$bp = BILLER_ID;
$publisher = PUBLISHER;

echo 'OK';
//$data = json_decode($json, true);
//$jsonMinimized = json_encode($data, JSON_UNESCAPED_SLASHES);
$newJson = str_replace("'", '"', $json);
$url = NOTIFI_END_POINT;
$head='';
$cmd = "curl -X POST ".$head;
$cmd.= " -d '" . $newJson . "' '" . $url . "'";
$cmd .= " > /dev/null 2>&1 &";

error_log("CMD =".$cmd);
exec($cmd, $output, $exit);
error_log("RESPONSE GIVEN  ID =".$rnd);die;

?>