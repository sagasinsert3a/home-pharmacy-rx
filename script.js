/**
 * Home Pharmacy - Main Interactions
 * Handles mobile drawer, FAQ accordion, counter animations, and header state.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // 2. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close other open accordions
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // 3. Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Header Shadow on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // 5. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!isNaN(target)) {
              animateCounter(stat, target);
            }
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const impactSection = document.getElementById('impact');
    if (impactSection) {
      observer.observe(impactSection);
    }
  }

  function animateCounter(el, target) {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const isPercentage = el.textContent.includes('%');
    const hasPlus = el.textContent.includes('+');

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(ease * target);

      let formatted = currentVal.toLocaleString();
      if (hasPlus) formatted += '+';
      if (isPercentage) formatted += '%';

      el.textContent = formatted;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }
});
