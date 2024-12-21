document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = loginForm.querySelector("button[type='submit']");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // Fungsi untuk validasi email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk format email
    return emailRegex.test(email);
  }

  // Fungsi untuk validasi password
  function validatePassword(password) {
    return password.length >= 8; // Password harus minimal 8 karakter
  }

  // Fungsi untuk memeriksa apakah tombol submit harus dinonaktifkan
  function checkFormValidity() {
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);

    // Tampilkan atau sembunyikan pesan error untuk email
    if (!isEmailValid && emailInput.value.trim() !== "") {
      emailError.textContent = "Masukkan email yang valid.";
    } else {
      emailError.textContent = "";
    }

    // Tampilkan atau sembunyikan pesan error untuk password
    if (!isPasswordValid && passwordInput.value.trim() !== "") {
      passwordError.textContent = "Password harus minimal 8 karakter.";
    } else {
      passwordError.textContent = "";
    }

    // Atur status tombol submit
    submitButton.disabled = !(isEmailValid && isPasswordValid);
  }

  // Event listener untuk validasi saat mengetik di email atau password
  emailInput.addEventListener("input", checkFormValidity);
  passwordInput.addEventListener("input", checkFormValidity);

  // Event listener untuk pengiriman form
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    fetch("../controllers/user_controller.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.success);
          // Redirect ke halaman Valorant setelah login berhasil
          window.location.href = "valorant.php";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan. Coba lagi nanti.");
      });
  });

  // Inisialisasi: disable tombol submit saat pertama kali load
  submitButton.disabled = true;
});
