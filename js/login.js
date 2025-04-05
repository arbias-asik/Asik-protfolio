document.addEventListener('DOMContentLoaded', () => {
  // Password visibility toggle
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Toggle eye icon
      const icon = togglePasswordBtn.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }

  // Input field focus effects
  const inputFields = document.querySelectorAll('.input-field input');

  inputFields.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    // Remove focus effect if field is empty
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });

    // Set focused class if field has value on page load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });

  // Form submission
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;

      // Form validation
      if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        shakeElement(loginForm);
        return;
      }

      // Show loading state
      const loginBtn = loginForm.querySelector('.btn-login');
      const originalBtnText = loginBtn.textContent;
      loginBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Signing in...';
      loginBtn.disabled = true;

      // Simulate API request (replace with actual authentication)
      setTimeout(() => {
        // Reset button state
        loginBtn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';

        // Show success notification
        showNotification('Login successful! Redirecting...', 'success');

        // Redirect after delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }, 2000);
    });
  }

  // Social login buttons
  const socialButtons = document.querySelectorAll('.social-btn');

  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const provider = button.classList.contains('google') ? 'Google' :
        button.classList.contains('github') ? 'GitHub' : 'Facebook';

      // Show loading state
      button.classList.add('loading');
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';

      // Simulate authentication process
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('loading');
        showNotification(`${provider} login is not implemented in this demo`, 'info');
      }, 1500);
    });
  });
});

// Show notification
function showNotification(message, type) {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;

  // Add icon based on type
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'exclamation-circle';

  notification.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span>${message}</span>
  `;

  // Add to DOM
  document.body.appendChild(notification);

  // Add styles if they don't exist
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 12px 20px;
        border-radius: 10px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s forwards, slideOut 0.3s forwards 3s;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }
      .notification.success { background-color: #4CAF50; }
      .notification.error { background-color: #F44336; }
      .notification.info { background-color: #2196F3; }
      .notification i { font-size: 1.2rem; }
      
      @keyframes slideIn {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove after delay
  setTimeout(() => {
    notification.remove();
  }, 3500);
}

// Shake animation for form validation errors
function shakeElement(element) {
  element.classList.add('shake');

  // Add shake animation styles if they don't exist
  if (!document.getElementById('shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .shake {
        animation: shake 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // Remove class after animation completes
  setTimeout(() => {
    element.classList.remove('shake');
  }, 600);
}
