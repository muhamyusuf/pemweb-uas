<?php
include '../config/db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'fetch') {
        // Fetch all data
        $query = "SELECT * FROM valorant_data";
        $result = $conn->query($query);

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_GET['action'] === 'create') {
        // Create data
        $player_name = htmlspecialchars($_POST['player_name']);
        $rank = htmlspecialchars($_POST['rank']);
        $favorite_agent = htmlspecialchars($_POST['favorite_agent']);

        $stmt = $conn->prepare("INSERT INTO valorant_data (player_name, rank, favorite_agent) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $player_name, $rank, $favorite_agent);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Data berhasil ditambahkan"]);
        } else {
            echo json_encode(["error" => "Gagal menambahkan data"]);
        }
        $stmt->close();
    } elseif ($_GET['action'] === 'update') {
        // Update data
        $id = intval($_POST['id']);
        $player_name = htmlspecialchars($_POST['player_name']);
        $rank = htmlspecialchars($_POST['rank']);
        $favorite_agent = htmlspecialchars($_POST['favorite_agent']);

        $stmt = $conn->prepare("UPDATE valorant_data SET player_name = ?, rank = ?, favorite_agent = ? WHERE id = ?");
        $stmt->bind_param("sssi", $player_name, $rank, $favorite_agent, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Data berhasil diupdate"]);
        } else {
            echo json_encode(["error" => "Gagal mengupdate data"]);
        }
        $stmt->close();
    } elseif ($_GET['action'] === 'delete') {
        // Delete data
        $id = intval($_POST['id']);

        $stmt = $conn->prepare("DELETE FROM valorant_data WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Data berhasil dihapus"]);
        } else {
            echo json_encode(["error" => "Gagal menghapus data"]);
        }
        $stmt->close();
    }
}

$conn->close();
?>