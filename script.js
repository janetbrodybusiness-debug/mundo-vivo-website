// Launch list UI hook.
// Replace the console call with a secure server-side endpoint before launch.
// Never expose Airtable credentials in browser JavaScript.
const launchForm = document.getElementById('launch');
const formStatus = document.getElementById('formStatus');

launchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = String(new FormData(launchForm).get('email') || '').trim();

  if (!email || !email.includes('@')) {
    formStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  console.log('Mundo Vivo launch-list signup:', email);
  formStatus.textContent = "You're on the launch list.";
  launchForm.reset();
});

// Mundo Vivo fish follows the pointer with a soft underwater lag.
(() => {
  const fish = document.getElementById('mundoCursor');
  const toggle = document.getElementById('motionToggle');
  if (!fish || !toggle) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(hover:none), (pointer:coarse)');
  const stored = localStorage.getItem('mv-motion');

  // Respect reduced-motion by default, while still allowing the visitor to opt in.
  let enabled = stored ? stored === 'on' : !reduced.matches;
  let tx = innerWidth * 0.72;
  let ty = innerHeight * 0.36;
  let x = tx;
  let y = ty;
  let raf = 0;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const sync = () => {
    document.body.classList.toggle('motion-off', !enabled);
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.setAttribute('aria-label', enabled ? 'Turn fish animation off' : 'Turn fish animation on');
    toggle.textContent = enabled ? 'Motion ON' : 'Motion OFF';
  };

  const loop = () => {
    if (!enabled) {
      raf = 0;
      return;
    }

    x += (tx - x) * 0.085;
    y += (ty - y) * 0.085;

    const offsetX = fish.offsetWidth * 0.48;
    const offsetY = fish.offsetHeight * 0.44;
    fish.style.transform = `translate3d(${x - offsetX}px, ${y - offsetY}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  const moveTarget = (clientX, clientY) => {
    tx = clamp(clientX + 30, 45, innerWidth - 45);
    ty = clamp(clientY + 16, 35, innerHeight - 35);
    if (enabled && !raf) raf = requestAnimationFrame(loop);
  };

  addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    moveTarget(event.clientX, event.clientY);
  }, { passive: true });

  // Keep the artwork inside the viewport after resize/orientation changes.
  addEventListener('resize', () => {
    tx = clamp(tx, 45, innerWidth - 45);
    ty = clamp(ty, 35, innerHeight - 35);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem('mv-motion', enabled ? 'on' : 'off');
    sync();

    if (enabled && !raf) {
      // On touch-only devices the fish remains a gentle static decorative element.
      if (coarse.matches) {
        tx = innerWidth * 0.78;
        ty = Math.min(innerHeight * 0.32, 330);
      }
      raf = requestAnimationFrame(loop);
    }
  });

  sync();
  if (enabled) raf = requestAnimationFrame(loop);
})();
