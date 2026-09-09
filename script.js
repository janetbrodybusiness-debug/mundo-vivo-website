const form = document.getElementById('launch');
const status = document.getElementById('status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = String(new FormData(form).get('email') || '').trim();

  if (!email || !email.includes('@')) {
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  status.textContent = 'Thanks — launch-list sign-up is being prepared.';
  form.reset();
});

(() => {
  const follower = document.getElementById('mundiFollower');
  const toggle = document.getElementById('motionToggle');
  if (!follower || !toggle) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(hover:none), (pointer:coarse)');
  const stored = localStorage.getItem('mundoMundiMotion');

  let enabled = stored ? stored === 'on' : !reduced.matches;
  let tx = innerWidth * 0.74;
  let ty = Math.min(innerHeight * 0.34, 330);
  let x = tx;
  let y = ty;
  let raf = 0;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const sync = () => {
    document.body.classList.toggle('motion-off', !enabled);
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Turn Mundi motion off' : 'Turn Mundi motion on');
    toggle.textContent = enabled ? 'Mundi Motion ON' : 'Mundi Motion OFF';
  };

  const animate = () => {
    if (!enabled) {
      raf = 0;
      return;
    }

    x += (tx - x) * 0.09;
    y += (ty - y) * 0.09;

    const offsetX = follower.offsetWidth * 0.46;
    const offsetY = follower.offsetHeight * 0.46;
    follower.style.transform = `translate3d(${x - offsetX}px, ${y - offsetY}px, 0)`;
    raf = requestAnimationFrame(animate);
  };

  const setTarget = (clientX, clientY) => {
    tx = clamp(clientX + 30, 42, innerWidth - 42);
    ty = clamp(clientY + 16, 36, innerHeight - 36);
    if (enabled && !raf) raf = requestAnimationFrame(animate);
  };

  addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    setTarget(event.clientX, event.clientY);
  }, { passive: true });

  addEventListener('resize', () => {
    tx = clamp(tx, 42, Math.max(42, innerWidth - 42));
    ty = clamp(ty, 36, Math.max(36, innerHeight - 36));
  }, { passive: true });

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem('mundoMundiMotion', enabled ? 'on' : 'off');
    sync();

    if (enabled && !raf) {
      if (coarse.matches) {
        tx = innerWidth * 0.76;
        ty = Math.min(innerHeight * 0.3, 280);
      }
      raf = requestAnimationFrame(animate);
    }
  });

  reduced.addEventListener?.('change', (event) => {
    if (localStorage.getItem('mundoMundiMotion') === null) {
      enabled = !event.matches;
      sync();
      if (enabled && !raf) raf = requestAnimationFrame(animate);
    }
  });

  sync();
  if (enabled) raf = requestAnimationFrame(animate);
})();
