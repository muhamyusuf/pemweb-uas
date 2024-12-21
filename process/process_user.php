<?php
session_start();
include '../config/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $confirmPassword = htmlspecialchars($_POST['confirm_password']);
    $ip = $_SERVER['REMOTE_ADDR'];
    $browser = $_SERVER['HTTP_USER_AGENT'];

    // Jika IPv6 localhost (::1), ganti dengan IPv4 localhost (127.0.0.1)
    if ($ip === '::1') {
        $ip = '127.0.0.1';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Email tidak valid.");
    }

    if ($password !== $confirmPassword) {
        die("Password dan konfirmasi password tidak cocok.");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (name, email, password, ip_address, browser) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $email, $hashedPassword, $ip, $browser);

    if ($stmt->execute()) {
        $_SESSION['username'] = $username;
        echo "Data berhasil disimpan.";
    } else {
        echo "Gagal menyimpan data: " . $stmt->error;
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT name, email FROM users";
    $result = $conn->query($query);

    $users = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($users);
}

$conn->close();
?>