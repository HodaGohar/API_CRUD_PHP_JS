<?php
include 'db.php';
header('Content-Type: application/json');

$response = array('success' => false);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM users WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = 'User deleted successfully!';
    } else {
        $response['message'] = 'Failed to delete user.';
    }
    echo json_encode($response);
}
?>