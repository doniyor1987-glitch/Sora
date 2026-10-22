const root = document.documentElement;
const chapters = [...document.querySelectorAll('.chapter')];
const links = [...document.querySelectorAll('.chapter-nav a')];
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const motion = document.querySelector('.motion');
let paused = preference.matches;
function updateMotion() {
  document.body.classList.toggle('still', paused);
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Harakatni yoqish' : 'Harakatni to‘xtatish';
}
motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
preference.addEventListener('change', event => { paused = event.matches; updateMotion(); });
let pending = false;
function render() {
  pending = false;
  const max = root.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0;
  root.style.setProperty('--progress', progress);
  root.style.setProperty('--home', Math.max(0, (progress - .78) / .22));
  let active = 0;
  chapters.forEach((chapter, index) => { if (chapter.getBoundingClientRect().top < innerHeight * .55) active = index; });
  document.body.dataset.stage = String(active);
  links.forEach((link, index) => { if (index === active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); });
}
function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }
addEventListener('scroll', schedule, { passive: true });
addEventListener('resize', schedule);
document.querySelectorAll('[data-item]').forEach(button => button.addEventListener('click', () => {
  button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  const selected = [...document.querySelectorAll('[data-item][aria-pressed="true"]')].map(item => item.dataset.item);
  document.querySelector('.status').textContent = selected.length === 3 ? 'Hammasi tayyor! Endi yo‘lga chiqamiz.' : selected.length ? `Xaltangda: ${selected.join(', ')}.` : 'Istasang, uchtalasini ham ol. Yo‘l seni kutmoqda.';
}));
updateMotion();
render();
