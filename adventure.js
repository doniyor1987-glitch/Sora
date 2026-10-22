/* Scroll-driven story: native CSS/SVG animations, no framework or paid dependencies. */
const chapters = [...document.querySelectorAll('.chapter')];
const scenes = [...document.querySelectorAll('.scene-stack > .scene')];
const dots = [...document.querySelectorAll('.dots a')];
const root = document.documentElement;
const chapterNumber = document.querySelector('#chapter-num');
const mobileHint = document.querySelector('#mobile-hint');
let activeIndex = -1;
let scheduled = false;
let didScroll = false;

function renderStory() {
  scheduled = false;
  const h = window.innerHeight || 1;
  const total = Math.max(1, root.scrollHeight - h);
  const y = window.scrollY || 0;
  root.style.setProperty('--reading', Math.max(0, Math.min(1, y / total)).toFixed(4));
  let next = 0;
  // A scene becomes active when the reader reaches it, rather than only at its top.
  chapters.forEach((chapter, i) => {
    if (chapter.getBoundingClientRect().top <= h * .57) next = i;
  });
  const rect = chapters[next].getBoundingClientRect();
  const span = Math.max(1, rect.height - h * .35);
  const phase = Math.min(1, Math.max(0, (h * .57 - rect.top) / span));
  root.style.setProperty('--phase', phase.toFixed(4));
  if (next !== activeIndex) {
    activeIndex = next;
    document.body.dataset.stage = String(next);
    scenes.forEach((scene, i) => scene.classList.toggle('is-active', i === next));
    dots.forEach((dot, i) => {
      if (i === next) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    if (chapterNumber) chapterNumber.textContent = String(next + 1).padStart(2, '0');
  }
  if (!didScroll && y > 35) {
    didScroll = true;
    mobileHint?.classList.add('is-hidden');
  }
}
function scheduleRender() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(renderStory);
}
addEventListener('scroll', scheduleRender, { passive:true });
addEventListener('resize', scheduleRender);
addEventListener('pageshow', scheduleRender);
renderStory();

const itemButtons = [...document.querySelectorAll('[data-item]')];
const inventoryNote = document.querySelector('.inventory-note');
function updateInventory() {
  const picked = itemButtons.filter(button => button.getAttribute('aria-pressed') === 'true').map(button => button.dataset.item);
  inventoryNote.textContent = picked.length === 3
    ? 'Ajoyib! Xaltang tayyor. Sarguzasht boshlansin! ✓'
    : picked.length
      ? 'Xaltangda: ' + picked.join(', ') + ' (' + picked.length + '/3)'
      : 'Safar buyumlarini tanlang (0/3)';
}
itemButtons.forEach(button => button.addEventListener('click', () => {
  button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
  updateInventory();
}));

const answers = [...document.querySelectorAll('[data-answer]')];
const creatureLine = document.querySelector('#creature-line');
const decisionNote = document.querySelector('.decision-note');
answers.forEach(button => button.addEventListener('click', () => {
  answers.forEach(answer => answer.setAttribute('aria-pressed', String(answer === button)));
  if (button.dataset.answer === 'kind') {
    creatureLine.textContent = '“Demak, uyingga shoshilayapsanmi? Unda o‘ngdagi yoritilgan so‘qmoqdan yur.”';
    decisionNote.textContent = 'Mehribon gap mojaroni hal qildi. Qo‘riqchi yo‘lni ko‘rsatdi. ♡';
  } else {
    creatureLine.textContent = '“Voy, bu qanaqa yaltiraydigan shisha? Qiziq ekan! O‘taver, yo‘lovchi!”';
    decisionNote.textContent = 'Ajablangan qo‘riqchi yo‘lni bo‘shatdi. ✧';
  }
}));

document.querySelector('#restart')?.addEventListener('click', () => {
  itemButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  updateInventory();
  answers.forEach(button => button.setAttribute('aria-pressed', 'false'));
  creatureLine.textContent = '“Hoy, yo‘lovchi! Xaltangdagi nima ekan?”';
  decisionNote.textContent = 'Qanday javob berishni o‘zingiz tanlang.';
});
