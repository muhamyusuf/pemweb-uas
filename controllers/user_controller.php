<?php
session_start();
include '../config/db_config.php';
include '../models/User.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // Validasi input
    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email dan password wajib diisi."]);
        exit;
    }

    $userModel = new User($conn);
    $user = $userModel->findByEmail($email);

    if ($user && $userModel->verifyPassword($password, $user['password'])) {
        // Simpan data user ke session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['ip_address'] = $user['ip_address'];
        $_SESSION['browser'] = $user['browser'];

        echo json_encode(["success" => "Login berhasil."]);
    } else {
        echo json_encode(["error" => "Email atau password salah."]);
    }
}
?>