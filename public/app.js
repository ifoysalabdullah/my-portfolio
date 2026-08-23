// Cal.com Global Initialization
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});
Cal.config = {forwardQueryParams: true};
Cal.ns["30min"]("ui", {"theme":"dark","cssVarsPerTheme":{"light":{"cal-brand":"#0088ff"},"dark":{"cal-brand":"#00ffff"}},"hideEventTypeDetails":false,"layout":"month_view"});

// 1. Theme Toggle 
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'day') { document.body.classList.add('day-mode'); }
updateThemeIcon();

if(themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('day-mode');
    localStorage.setItem('theme', document.body.classList.contains('day-mode') ? 'day' : 'night');
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  if(!themeBtn) return;
  const isDay = document.body.classList.contains('day-mode');
  themeBtn.innerHTML = isDay 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
}

// 2. Animated Number Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      let count = 0;
      const updateCount = () => {
        const increment = (target - count) / 15; 
        count += increment;
        if (target - count > 0.05) {
          entry.target.innerText = isDecimal ? count.toFixed(1) : Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          entry.target.innerText = target + (isDecimal ? "" : "+");
        }
      };
      updateCount();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// 3. Exact FAQ Accordion
document.querySelectorAll('.faq-box').forEach(box => {
  box.addEventListener('click', () => {
    const isActive = box.classList.contains('active');
    document.querySelectorAll('.faq-box').forEach(b => b.classList.remove('active'));
    if (!isActive) box.classList.add('active');
  });
});

// 4. Reveal Animation for Services
const serviceSteps = document.querySelectorAll('.service-step');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.3 });
serviceSteps.forEach(step => revealObserver.observe(step));

// 5. BULLETPROOF LIGHTBOX VIDEO PLAYER (Fixes Error 153)
const lightbox = document.getElementById('lightbox');
const lbContainer = document.getElementById('lightbox-iframe-container');

window.openLightbox = function(videoId) {
  if(!lightbox || !lbContainer) return;
  lightbox.classList.add('active');
  
  // Uses exact provided iframe params, adds autoplay, and forces an origin to bypass local file errors
  lbContainer.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1&origin=https://youtube.com" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
};

window.closeLightbox = function() {
  if(!lightbox || !lbContainer) return;
  lightbox.classList.remove('active');
  lbContainer.innerHTML = ""; 
};

if(lightbox) {
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });
}