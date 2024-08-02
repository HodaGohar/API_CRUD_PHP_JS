<?php
include 'db.php';
header('Content-Type: application/json');

$response = array('success' => false);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $age = $_POST['age'];
    $city = $_POST['city'];

    if (empty($name) || empty($email) || empty($phone) || empty($age) || empty($city)) {
        $response['message'] = 'Please fill out all fields.';
    } else {
        $sql = "INSERT INTO users (name, email, phone, age, city) VALUES ('$name', '$email', '$phone', '$age', '$city')";
        $upload = mysqli_query($conn, $sql);

        if ($upload) {
            $response['success'] = true;
            $response['message'] = 'User added successfully!';
        } else {
            $response['message'] = 'Failed to add user.';
        }
    }
    echo json_encode($response);
}
?>