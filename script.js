(() => {
  const art = document.getElementById('mouse-art');
  const toggle = document.getElementById('mouse-toggle');
  const stateText = toggle.querySelector('.toggle-state');
  const form = document.getElementById('launch-form');
  const message = document.getElementById('form-message');
  const storageKey = 'mv-mouse-follow-enabled';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let enabled = localStorage.getItem(storageKey) !== 'false';
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  const maxOffset = 170;
  const lag = 0.1;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function renderToggle() {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', `${enabled ? 'Turn off' : 'Turn on'} mouse-follow artwork`);
    stateText.textContent = enabled ? 'ON' : 'OFF';
    art.style.opacity = enabled ? '1' : '0';
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem(storageKey, String(enabled));
    renderToggle();
  });

  window.addEventListener('pointermove', (event) => {
    if (!enabled || reduceMotion) return;
    const dx = event.clientX - window.innerWidth / 2;
    const dy = event.clientY - window.innerHeight / 2;
    targetX = clamp(dx * 0.22, -maxOffset, maxOffset);
    targetY = clamp(dy * 0.22, -maxOffset, maxOffset);
  }, { passive: true });

  function animate() {
    if (enabled && !reduceMotion) {
      currentX += (targetX - currentX) * lag;
      currentY += (targetY - currentY) * lag;
      art.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
    requestAnimationFrame(animate);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    if (!email || !form.email.checkValidity()) {
      message.textContent = 'Please enter a valid email address.';
      return;
    }
    // GitHub Pages is static. Replace this demo handler with Formspree/Mailchimp/Brevo/API endpoint for production.
    message.textContent = 'Thank you — your email is ready to be connected to the launch-list service.';
    form.reset();
  });

  renderToggle();
  requestAnimationFrame(animate);
})();
