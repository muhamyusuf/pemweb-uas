document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");
  const termsCheckbox = document.getElementById("terms");
  const submitButton = form.querySelector("button[type='submit']");
  const dataTable = document.getElementById("dataTable").querySelector("tbody");

  // Elemen untuk pesan error
  const usernameError = document.createElement("span");
  const emailError = document.createElement("span");
  const passwordError = document.createElement("span");
  const confirmPasswordError = document.createElement("span");

  // Styling error message
  [usernameError, emailError, passwordError, confirmPasswordError].forEach(
    (el) => {
      el.style.color = "red";
      el.style.fontSize = "12px";
    }
  );

  // Tambahkan error message setelah input
  usernameInput.parentElement.appendChild(usernameError);
  emailInput.parentElement.appendChild(emailError);
  passwordInput.parentElement.appendChild(passwordError);
  confirmPasswordInput.parentElement.appendChild(confirmPasswordError);

  // Validasi input
  function validateUsername(username) {
    return username.trim().length >= 3;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return password.trim().length >= 8;
  }

  function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }

  function checkFormValidity() {
    const isUsernameValid = validateUsername(usernameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmPasswordValid = passwordsMatch(
      passwordInput.value,
      confirmPasswordInput.value
    );
    const isTermsChecked = termsCheckbox.checked;

    // Pesan error
    usernameError.textContent = isUsernameValid
      ? ""
      : "Username minimal 3 karakter.";
    emailError.textContent = isEmailValid ? "" : "Masukkan email yang valid.";
    passwordError.textContent = isPasswordValid
      ? ""
      : "Password minimal 8 karakter.";
    confirmPasswordError.textContent = isConfirmPasswordValid
      ? ""
      : "Password dan konfirmasi password harus sama.";

    // Tombol submit hanya aktif jika semua validasi lolos
    submitButton.disabled = !(
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isTermsChecked
    );
  }

  // Event listeners untuk validasi
  usernameInput.addEventListener("input", checkFormValidity);
  emailInput.addEventListener("input", checkFormValidity);
  passwordInput.addEventListener("input", checkFormValidity);
  confirmPasswordInput.addEventListener("input", checkFormValidity);
  termsCheckbox.addEventListener("change", checkFormValidity);

  // Load users untuk tabel
  function loadUsers() {
    fetch("../process/process_user.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        dataTable.innerHTML = "";
        data.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `<td>${user.name}</td><td>${user.email}</td>`;
          dataTable.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error loading users:", error);
      });
  }

  // Submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("../process/process_user.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        if (data.includes("berhasil disimpan")) {
          // Redirect ke login.html jika pendaftaran berhasil
          window.location.href = "login.html";
        } else {
          loadUsers(); // Tetap load data jika tidak berhasil
        }
        form.reset();
        checkFormValidity(); // Reset validasi setelah submit
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  });

  // Inisialisasi: disable tombol submit saat pertama kali load
  submitButton.disabled = true;

  // Load user data
  loadUsers();
});
