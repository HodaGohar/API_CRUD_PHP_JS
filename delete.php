<?php
include 'db.php';
header('Content-Type: application/json');
$mas = array('success' => TRUE);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $del = "DELETE  FROM  users  WHERE  id=$id" ;
    if ($conn->query($del) === TRUE) {
        $mas['message'] = 'deleted successfully';
    } else {
        $mas['success'] = FALSE;
        $mas['message'] = 'error during deleted.';
    }
  echo json_encode($mas);
}
?>