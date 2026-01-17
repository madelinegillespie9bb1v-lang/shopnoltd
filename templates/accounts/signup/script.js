<script>
document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('id_password');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmInput = document.getElementById('confirm_password');
  const form = document.querySelector('.registration-form');

  // Toggle for main password
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePassword.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // Toggle for confirm password
  if (toggleConfirmPassword && confirmInput) {
    toggleConfirmPassword.addEventListener('click', function () {
      const isPassword = confirmInput.type === 'password';
      confirmInput.type = isPassword ? 'text' : 'password';
      toggleConfirmPassword.textContent = isPassword ? '🙈' : '👁';
    });
  }

  // Validate password match before submission
  if (form) {
    form.addEventListener('submit', function (event) {
      if (passwordInput.value !== confirmInput.value) {
        event.preventDefault();
        alert('❌ Passwords do not match. Please recheck.');
        confirmInput.focus();
      }
    });
  }
});
</script>
