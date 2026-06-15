/* DemandRise - Main JS */

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    const hideLoader = () => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 450);
    };
    setTimeout(hideLoader, 700);
  }

  const bar = document.querySelector('.scroll-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }

  const header = document.querySelector('.site-header');
  if (header) {
    const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 40 || !document.querySelector('.hero'));
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      mainNav.classList.toggle('open', !open);
    });
  }

  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => obs.observe(el));
    }
    setTimeout(() => revealEls.forEach((el) => el.classList.add('in-view')), 900);
  }

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    el.textContent = prefix + target.toLocaleString('uk-UA').replace(/\u00a0/g, ' ') + suffix;
  });

  const popup = document.getElementById('cookiePopup');
  if (popup && !localStorage.getItem('demandrise_cookies')) {
    setTimeout(() => popup.classList.add('visible'), 1800);
  }
  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('demandrise_cookies', 'accepted');
    popup?.classList.remove('visible');
  });
  document.getElementById('declineCookies')?.addEventListener('click', () => {
    localStorage.setItem('demandrise_cookies', 'declined');
    popup?.classList.remove('visible');
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-cat]');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.opacity = match ? '1' : '0.28';
        card.style.transform = match ? '' : 'scale(0.97)';
        card.style.transition = 'opacity .3s ease, transform .3s ease';
      });
    });
  });

  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((openItem) => openItem.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const form = document.querySelector('.contact-form-el');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const btn = form.querySelector('.form-submit .btn');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Відправлено';
      btn.style.background = 'var(--sage)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2500);
    });
  }

  const blob = document.querySelector('.hero-blob');
  if (blob) {
    window.addEventListener('mousemove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 20;
      const y = (event.clientY / window.innerHeight - 0.5) * 20;
      blob.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });
});
