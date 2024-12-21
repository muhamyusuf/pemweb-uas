<?php include '../session/session.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Data Valorant</title>
  <link rel="stylesheet" href="../public/css/style.css" />
  <script src="../public/js/valorant.js" defer></script>
</head>

<body>
  <header>
    <p>Welcome, <strong><?php echo htmlspecialchars($_SESSION['user_name']); ?></strong>!</p>
    <p>IP Address: <strong><?php echo htmlspecialchars($_SESSION['ip_address']); ?></strong></p>
    <p>Browser: <strong><?php echo htmlspecialchars($_SESSION['browser']); ?></strong></p>
    <a href="../controllers/logout.php" class="logout-button">Logout</a>
  </header>

  <h1>Data Valorant</h1>

  <form id="valorantForm" method="POST">
    <label>
      Player Name:
      <input type="text" name="player_name" id="player_name" required />
    </label>
    <label>
      Rank:
      <input type="text" name="rank" id="rank" required />
    </label>
    <label>
      Favorite Agent:
      <input type="text" name="favorite_agent" id="favorite_agent" required />
    </label>
    <button type="submit" class="add-valorant-btn" disabled>Add Data</button>
  </form>

  <h2>Valorant Player Data</h2>
  <table id="valorantTable">
    <thead>
      <tr>
        <th>Player Name</th>
        <th>Rank</th>
        <th>Favorite Agent</th>
        <th>Created At</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <h1>Kelola State dengan Cookie dan Browser Storage</h1>

  <!-- Input untuk menetapkan nilai -->
  <form id="stateForm">
    <label>
      Masukkan Nilai:
      <input type="text" id="stateInput" placeholder="Ketik sesuatu..." required />
    </label>
    <br><br>
    <button type="button" id="setCookieBtn">Set Cookie</button>
    <button type="button" id="setLocalStorageBtn">Set LocalStorage</button>
    <button type="button" id="setSessionStorageBtn">Set SessionStorage</button>
  </form>

  <h2>Nilai yang Tersimpan</h2>
  <p><strong>Nilai Cookie:</strong> <span id="cookieDisplay">Belum ada nilai</span></p>
  <p><strong>Nilai LocalStorage:</strong> <span id="localStorageDisplay">Belum ada nilai</span></p>
  <p><strong>Nilai SessionStorage:</strong> <span id="sessionStorageDisplay">Belum ada nilai</span></p>

  <script>
    // Referensi ke elemen DOM
    const stateInput = document.getElementById("stateInput");
    const cookieDisplay = document.getElementById("cookieDisplay");
    const localStorageDisplay = document.getElementById("localStorageDisplay");
    const sessionStorageDisplay = document.getElementById("sessionStorageDisplay");

    // Set Cookie
    document.getElementById("setCookieBtn").addEventListener("click", function () {
      const value = stateInput.value;
      if (value.trim() === "") {
        alert("Masukkan nilai terlebih dahulu!");
        return;
      }
      document.cookie = `valorantCookie=${value}; path=/; max-age=3600`; // Berlaku selama 1 jam
      perbaruiTampilan();
    });

    // Set LocalStorage
    document.getElementById("setLocalStorageBtn").addEventListener("click", function () {
      const value = stateInput.value;
      if (value.trim() === "") {
        alert("Masukkan nilai terlebih dahulu!");
        return;
      }
      localStorage.setItem("valorantLocalStorage", value);
      perbaruiTampilan();
    });

    // Set SessionStorage
    document.getElementById("setSessionStorageBtn").addEventListener("click", function () {
      const value = stateInput.value;
      if (value.trim() === "") {
        alert("Masukkan nilai terlebih dahulu!");
        return;
      }
      sessionStorage.setItem("valorantSessionStorage", value);
      perbaruiTampilan();
    });

    // Fungsi untuk memperbarui tampilan nilai
    function perbaruiTampilan() {
      // Tampilkan Cookie
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {});
      cookieDisplay.textContent = cookies.valorantCookie || "Belum ada nilai";

      // Tampilkan LocalStorage
      const localStorageValue = localStorage.getItem("valorantLocalStorage");
      localStorageDisplay.textContent = localStorageValue || "Belum ada nilai";

      // Tampilkan SessionStorage
      const sessionStorageValue = sessionStorage.getItem("valorantSessionStorage");
      sessionStorageDisplay.textContent = sessionStorageValue || "Belum ada nilai";
    }

    // Inisialisasi tampilan
    perbaruiTampilan();
  </script>
</body>

</html>