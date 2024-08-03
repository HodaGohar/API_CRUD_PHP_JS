<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $age = $_POST['age'];
    $city = $_POST['city'];

    $sql = "UPDATE users SET name='$name' , email='$email' , phone='$phone' , age='$age' , city='$city' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "New record updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

header("Location: index.html");