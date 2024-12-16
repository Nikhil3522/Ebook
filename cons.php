<?php
@session_start();
$servername = "localhost";
$username = "user111";
$password = "pass@12#";
$database = "ebook";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");

// for Testing purpose;
$user_id = 1; 

?>