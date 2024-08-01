<?php
$servername = 'localhost';
$userName = 'root';
$password = '';
$dbName = 'api_crud';

$conn = new mysqli($servername , $userName , $password , $dbName);

if($conn ->connect_errno){
    die("connection failed" .$conn->connect_errno);
}
