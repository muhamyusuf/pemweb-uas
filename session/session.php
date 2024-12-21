<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: ../views/login.html");
    exit;
}

$userName = $_SESSION['user_name'];
?>