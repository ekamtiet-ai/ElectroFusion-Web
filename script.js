// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.main-nav a, .footer-nav a');

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  // Check if the link matches the current page, or if it's an anchor link on the current page
  if (linkHref === currentPath || linkHref.startsWith(currentPath + '#')) {
    link.classList.add('active');
  }
});

// ==========================================
// Mobile Nav Toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================
// Footer Year Auto-Update
// ==========================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
// ==========================================
// Interactive Particles
// ==========================================
if (document.getElementById('particles-js')) {
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#5fd6c4" }, // Matches your teal accent
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#5fd6c4",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
}

// ==========================================
// Circuit Tree Scroll Glow Tracker
// ==========================================
const treeSection = document.querySelector('.circuit-tree');
const treeSpine = document.querySelector('.tree-spine');
const treeBranches = document.querySelectorAll('.tree-branch');

if (treeSection && treeSpine) {
  window.addEventListener('scroll', () => {
    // Calculate distances
    const rect = treeSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Start the glow when the tree reaches the middle of the screen
    const scrollStart = windowHeight / 2;
    let scrollProgress = 0;

    // Calculate percentage filled
    if (rect.top < scrollStart) {
      scrollProgress = ((scrollStart - rect.top) / rect.height) * 100;
      scrollProgress = Math.max(0, Math.min(scrollProgress, 100)); // Cap between 0 and 100
    }
    
    // Send the percentage to CSS
    treeSpine.style.setProperty('--scroll-glow', `${scrollProgress}%`);

    // Light up nodes as the trace passes them
    treeBranches.forEach(branch => {
      const branchRect = branch.getBoundingClientRect();
      const node = branch.querySelector('.node');
      
      if (branchRect.top < scrollStart && node) {
        node.classList.add('active-node');
      } else if (node) {
        node.classList.remove('active-node');
      }
    });
  });
}

// ==========================================
// System Boot Preloader
// ==========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  
  if (preloader) {
    // 1.2-second delay to show off the charging animation
    setTimeout(() => {
      preloader.classList.add('loader-hidden');
    }, 1200); 
  }
});