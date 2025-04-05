// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const scrollTopBtn = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const progressBars = document.querySelectorAll('.progress');
const contactForm = document.getElementById('contact-form');

// Initialize Typed.js
const typed = new Typed('.typing', {
  strings: ['Web Developer', 'UI/UX Designer', 'Frontend Developer',],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

// Toggle theme (dark/light mode)
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Change icon based on theme
  if (document.body.classList.contains('dark-theme')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// Sticky Header
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }

  // Show/hide scroll to top button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }

  // Animate skill progress bars when in view
  animateProgressBars();
});

// Animate progress bars when in view
function animateProgressBars() {
  progressBars.forEach(progress => {
    const position = progress.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (position < screenPosition) {
      const value = progress.getAttribute('data-value');
      progress.style.width = value;
    }
  });
}

// Project Filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Get filter value
    const filterValue = btn.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Simple form validation (you can add more sophisticated validation)
  if (name && email && subject && message) {
    // Send form data (this would be replaced with actual API call)
    console.log({ name, email, subject, message });

    // Show success message
    showNotification('Your message has been sent successfully!', 'success');

    // Reset form
    contactForm.reset();
  } else {
    showNotification('Please fill in all fields', 'error');
  }
});

// Notification function
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Add smooth scrolling for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        z-index: 1001;
        animation: slideIn 0.5s forwards;
    }
    
    .notification.success {
        background-color: var(--success-color);
    }
    
    .notification.error {
        background-color: #dc3545;
    }
    
    .notification.hide {
        animation: slideOut 0.5s forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set active nav link on page load
  const scrollPosition = window.scrollY;
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinksItems.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Initialize AOS (if you decide to use it)
  // AOS.init();
});
