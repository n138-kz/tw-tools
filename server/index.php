<?php session_start();
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    include_once(__DIR__ . '/../vendor/autoload.php');
}
date_default_timezone_set('Asia/Tokyo');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Origin, Accept, Access-Control-Allow-Headers, X-Token");

header('Server: Hidden');
header('X-Powered-By: Hidden');

echo json_encode([
    'iat' => time(),
    'access_token' => $_POST['access_token'],
    'section' => $_POST['section'],
    'contents' => $_POST['contents'],
]);
