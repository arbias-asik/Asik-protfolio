document.addEventListener('DOMContentLoaded', () => {
  // Handle password visibility toggle
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Change the eye icon based on password visibility
      const icon = togglePasswordBtn.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }

  // Add animation to input fields on focus
  const inputFields = document.querySelectorAll('.input-icon input');

  inputFields.forEach(input => {
    input.addEventListener('focus', () => {
      const iconElement = input.parentElement.querySelector('i');
      if (iconElement) {
        iconElement.style.color = 'var(--primary-color)';
      }
    });

    input.addEventListener('blur', () => {
      const iconElement = input.parentElement.querySelector('i');
      if (iconElement && !input.value) {
        iconElement.style.color = 'var(--secondary-color)';
      }
    });
  });

  // Handle login form submission with animation
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;

      // Simple validation
      if (!username || !password) {
        showLoginNotification('Please fill in all fields', 'error');
        shakeElement(loginForm);
        return;
      }

      // Add submitting animation
      loginForm.classList.add('form-submitting');
      const loginBtn = loginForm.querySelector('.login-btn');
      const originalBtnText = loginBtn.textContent;
      loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

      // Here you would typically send a request to your backend to authenticate
      // For demonstration, we'll just log the values and show a success message after a delay
      console.log({ username, password, remember });

      // Simulate API request delay
      setTimeout(() => {
        // Remove submitting animation
        loginForm.classList.remove('form-submitting');
        loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        loginForm.classList.add('login-success');

        showLoginNotification('Login successful! Redirecting...', 'success');

        // Simulate redirect after successful login
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }, 2000);
    });
  }

  // Social login buttons (placeholder functionality) with animation
  const socialButtons = document.querySelectorAll('.social-btn');

  socialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const provider = button.classList.contains('google') ? 'Google' : 'Facebook';

      // Add animation to button
      button.style.pointerEvents = 'none';
      const originalHTML = button.innerHTML;
      button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.pointerEvents = 'auto';
        showLoginNotification(`${provider} login is not implemented in this demo`, 'info');
      }, 1500);
    });
  });

  // Add animation to elements when they come into view
  animateOnScroll();
});

// Animate shake effect for error validation
function shakeElement(element) {
  element.classList.add('shake-animation');

  // Add CSS for shake animation if it doesn't exist
  if (!document.getElementById('shake-animation-style')) {
    const style = document.createElement('style');
    style.id = 'shake-animation-style';
    style.textContent = `
      @keyframes shakeAnimation {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .shake-animation {
        animation: shakeAnimation 0.6s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // Remove animation class after it completes
  setTimeout(() => {
    element.classList.remove('shake-animation');
  }, 600);
}

// Animate elements when they come into view
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe form elements for animation
  document.querySelectorAll('.login-form-container > *').forEach(element => {
    observer.observe(element);
  });
}

// Enhanced notification function with animation
function showLoginNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add icon based on notification type
  const icon = document.createElement('i');
  if (type === 'success') {
    icon.className = 'fas fa-check-circle';
  } else if (type === 'error') {
    icon.className = 'fas fa-exclamation-circle';
  } else if (type === 'info') {
    icon.className = 'fas fa-info-circle';
  }

  notification.prepend(icon);
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.gap = '10px';

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}
