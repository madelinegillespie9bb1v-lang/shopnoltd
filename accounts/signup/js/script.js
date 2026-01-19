// /accounts/register/js/script.js
document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('id_password');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmInput = document.getElementById('confirm_password');
  const form = document.querySelector('.registration-form');

  // Helper to toggle a password input and update icon
  function toggleInputVisibility(button, input) {
    if (!button || !input) return;
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const currentlyPassword = input.type === 'password';
      input.type = currentlyPassword ? 'text' : 'password';
      // change icon for feedback
      button.textContent = currentlyPassword ? '🙈' : '👁';
      // keep focus on input for better UX on mobile
      input.focus();
    });
  }

  toggleInputVisibility(togglePassword, passwordInput);
  toggleInputVisibility(toggleConfirmPassword, confirmInput);

  // Validate password match before submitting
  if (form) {
    form.addEventListener('submit', function (event) {
      // basic front-end check
      if (passwordInput && confirmInput && passwordInput.value !== confirmInput.value) {
        event.preventDefault();
        // friendly UI message instead of only alert
        if (!document.getElementById('pwError')) {
          const error = document.createElement('div');
          error.id = 'pwError';
          error.className = 'pw-error';
          error.textContent = '❌ Passwords do not match. Please recheck.';
          passwordInput.closest('.field').insertAdjacentElement('afterend', error);
        }
        confirmInput.focus();
        return false;
      }
      // allow submission otherwise
    });
  }
});
