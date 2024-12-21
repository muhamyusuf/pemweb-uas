document.addEventListener("DOMContentLoaded", function () {
  const valorantForm = document.getElementById("valorantForm");
  const playerNameInput = document.getElementById("player_name");
  const rankInput = document.getElementById("rank");
  const favoriteAgentInput = document.getElementById("favorite_agent");
  const submitButton = valorantForm.querySelector("button[type='submit']");
  const valorantTable = document
    .getElementById("valorantTable")
    .querySelector("tbody");

  let editMode = false;
  let editId = null;

  // Fungsi untuk validasi formulir
  function checkFormValidity() {
    const isPlayerNameValid = playerNameInput.value.trim().length > 0;
    const isRankValid = rankInput.value.trim().length > 0;
    const isFavoriteAgentValid = favoriteAgentInput.value.trim().length > 0;

    submitButton.disabled = !(
      isPlayerNameValid &&
      isRankValid &&
      isFavoriteAgentValid
    );
  }

  function loadValorantData() {
    fetch("../controllers/valorant_controller.php?action=fetch")
      .then((response) => response.json())
      .then((data) => {
        valorantTable.innerHTML = "";
        data.forEach((player) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${player.player_name}</td>
                <td>${player.rank}</td>
                <td>${player.favorite_agent}</td>
                <td>${player.created_at}</td>
                <td>
                  <button class="edit-btn" data-id="${player.id}">Edit</button>
                  <button class="delete-btn" data-id="${player.id}">Delete</button>
                </td>
              `;
          valorantTable.appendChild(row);
        });
        attachTableEventListeners();
      })
      .catch((error) => {
        console.error("Error fetching Valorant data:", error);
      });
  }

  function attachTableEventListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        fetch(`../controllers/valorant_controller.php?action=fetch`)
          .then((response) => response.json())
          .then((data) => {
            const player = data.find((p) => p.id == id);
            if (player) {
              editMode = true;
              editId = id;
              playerNameInput.value = player.player_name;
              rankInput.value = player.rank;
              favoriteAgentInput.value = player.favorite_agent;
              submitButton.textContent = "Update Data";
              checkFormValidity(); // Validasi ulang setelah data diisi
            }
          });
      })
    );

    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Yakin ingin menghapus data ini?")) {
          fetch(`../controllers/valorant_controller.php?action=delete`, {
            method: "POST",
            body: new URLSearchParams({ id }),
          })
            .then((response) => response.json())
            .then((message) => {
              alert(message.message || message.error);
              // Reload browser setelah data dihapus
              window.location.reload();
            });
        }
      })
    );
  }

  valorantForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new URLSearchParams({
      player_name: playerNameInput.value.trim(),
      rank: rankInput.value.trim(),
      favorite_agent: favoriteAgentInput.value.trim(),
    });

    if (editMode) {
      formData.append("id", editId);
      fetch(`../controllers/valorant_controller.php?action=update`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((message) => {
          alert(message.message || message.error);
          editMode = false;
          editId = null;
          submitButton.textContent = "Add Data";
          valorantForm.reset();
          // Reload browser setelah data diperbarui
          window.location.reload();
        });
    } else {
      fetch(`../controllers/valorant_controller.php?action=create`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((message) => {
          alert(message.message || message.error);
          valorantForm.reset();
          // Reload browser setelah data ditambahkan
          window.location.reload();
        });
    }
  });

  playerNameInput.addEventListener("input", checkFormValidity);
  rankInput.addEventListener("input", checkFormValidity);
  favoriteAgentInput.addEventListener("input", checkFormValidity);

  loadValorantData();
  checkFormValidity(); // Pastikan tombol disable pada awal load
});
