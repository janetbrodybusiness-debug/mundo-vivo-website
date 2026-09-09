
(() => {
  const fish = document.getElementById("mouse-fish");
  const toggle = document.getElementById("art-toggle");
  const state = toggle.querySelector(".state");
  const form = document.getElementById("launch-form");
  const message = document.getElementById("form-message");

  const storageKey = "mv-interactive-art-enabled";
  let enabled = localStorage.getItem(storageKey) !== "false";

  // Cursor target. Fish is intentionally only 8px right and 5px below the cursor.
  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let lastPointerX = 0;
  let facing = 1;

  const OFFSET_X = 8;
  const OFFSET_Y = 5;
  const LAG = 0.42; // tight tracking; much closer than the previous version

  function updateToggle() {
    toggle.classList.toggle("off", !enabled);
    fish.classList.toggle("hidden", !enabled);
    state.textContent = enabled ? "ON" : "OFF";
    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute(
      "aria-label",
      enabled ? "Turn interactive fish off" : "Turn interactive fish on"
    );
  }

  function setEnabled(next) {
    enabled = !!next;
    localStorage.setItem(storageKey, String(enabled));
    updateToggle();
  }

  toggle.addEventListener("click", () => setEnabled(!enabled));

  window.addEventListener("pointermove", (event) => {
    if (!enabled) return;

    targetX = event.clientX + OFFSET_X;
    targetY = event.clientY + OFFSET_Y;

    if (event.clientX < lastPointerX - 1) facing = -1;
    else if (event.clientX > lastPointerX + 1) facing = 1;

    lastPointerX = event.clientX;
  }, { passive: true });

  function animate() {
    if (enabled) {
      currentX += (targetX - currentX) * LAG;
      currentY += (targetY - currentY) * LAG;

      // Flip the small fish according to cursor direction.
      fish.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0) scaleX(${facing})`;
    }

    requestAnimationFrame(animate);
  }

  // Static GitHub Pages cannot store launch-list submissions by itself.
  // This keeps the UI functional until Airtable / Formspree / Mailchimp is connected.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    message.textContent = "Thank you — launch-list connection is ready to be linked.";
    message.classList.add("show");
    setTimeout(() => message.classList.remove("show"), 3200);
  });

  updateToggle();
  requestAnimationFrame(animate);
})();
