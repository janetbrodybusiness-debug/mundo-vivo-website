
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

// Supplied Mundo Vivo fish follows the mouse with a soft underwater lag.
(() => {
  const fish = document.getElementById('mundoCursor');
  const toggle = document.getElementById('motionToggle');
  if (!fish || !toggle) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(hover:none), (pointer:coarse)');
  if (reduced.matches || coarse.matches) return;

  let enabled = localStorage.getItem('mv-motion') !== 'off';
  let tx = innerWidth * .72;
  let ty = innerHeight * .36;
  let x = tx;
  let y = ty;
  let raf = 0;

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
    x += (tx - x) * .075;
    y += (ty - y) * .075;
    fish.style.transform = `translate3d(${x - fish.offsetWidth*.48}px, ${y - fish.offsetHeight*.44}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    tx = Math.max(45, Math.min(innerWidth - 45, e.clientX + 34));
    ty = Math.max(35, Math.min(innerHeight - 35, e.clientY + 18));
    if (enabled && !raf) raf = requestAnimationFrame(loop);
  }, {passive:true});

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    localStorage.setItem('mv-motion', enabled ? 'on' : 'off');
    sync();
    if (enabled && !raf) raf = requestAnimationFrame(loop);
  });

  sync();
  if (enabled) raf = requestAnimationFrame(loop);
})();
