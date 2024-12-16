<?php
date_default_timezone_set("Asia/Calcutta"); 
define( 'SERVER', 'localhost' );
define( 'USERNAME', 'user111' );
define( 'PASSWORD', 'pass@12#' );
define( 'DATABASENAME', 'vas_dcb' );
define( 'PORT', 3306 );

$conn = mysqli_connect(SERVER, USERNAME, PASSWORD,DATABASENAME);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
GLOBAL $conn;

//http://51.68.207.190/roshansam/afgroshsam/plans.php

define('BASE_LOG_PATH','/var/www/html/dcblogs/ebookRoshanLogs');
define('SITE_URL','http://51.68.207.190/roshanebook/index.php');
define('LOGIN_URL','http://51.68.207.190/roshanebook/index.php');
define('BILLER_ID','ebookroshan');
define('PUBLISHER','ebook');
define('PRODUCT_NAME','Roshan Ebooks');
define('PACKID',63); //63/64/65
define('CMPID',106); //106/107/108
define('OPERATOR','Roshan');
define('SP_ID','930009090300');
define('USR_NAME','pea');
define('USR_PWD','F7Omh!+a24L');
define('SRTCODE','244');
define('SERVICE_ID',"93000983002");
define('PRODUCT_ID',"930009830022441");//930009830022441/930009830022442/930009830022443 //D/W/M
define('CHANNELID','4');//WEB


define('SUBSCRIBE_API','http://191.101.113.4:6768/samsson/notify/subscribe/');
define('UNSUBSCRIBE_API','http://191.101.113.4:6768/samsson/notify/unsubscribe/');
define('SMS_API','http://191.101.113.4:6768/samsson/notify/sendsms/');
define('STATUS_API','http://191.101.113.4:6768/samsson/notify/status/');

define('TEXT_MSG','Thanks for subscribing Roshan Ebook. Enjoy your content by visiting '.LOGIN_URL);

define('LP_URL','http://51.68.207.190/roshanebook/plans.php');
define('DOWNLOAD_LIMIT_MONTHLY',1);
define('NOTIFI_END_POINT','http://51.68.207.190/roshanebook/callbackProcess.php');






 ?>
